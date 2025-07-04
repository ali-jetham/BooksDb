import axios from "axios";

export const api = axios.create({
	baseURL: " https://yeti-measured-correctly.ngrok-free.app/api",
	withCredentials: true,
});

// api.interceptors.response.use(() => { });
