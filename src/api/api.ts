import type { AxiosError } from "axios";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

let retry = false;

export const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	function (response) {
		return response;
	},

	async function (error: AxiosError) {
		const config = error.config as any;

		if (config.url.includes("/token/refresh")) {
			// TODO: add some logout logic
			return Promise.reject(error);
		}

		if (error.response?.status === 401 && !retry) {
			retry = true;

			try {
				useAuthStore.getState().refresh();
				return api(config);
			} catch (refreshError) {
				Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);
