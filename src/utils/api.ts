import axios from "axios";
import type { AxiosError } from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const api = axios.create({
	baseURL: " https://yeti-measured-correctly.ngrok-free.app/api",
	withCredentials: true,
});

api.interceptors.response.use(
	function (response) {
		console.log(response);
		return response;
	},

	function (error: AxiosError) {
		if (error.status === 401) {
			useAuthStore.getState().refresh();
		}
		return Promise.reject(error);
	},
);
