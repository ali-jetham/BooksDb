import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	plugins: [react(), tailwindcss(), viteBasicSslPlugin()],
	server: { https: false, allowedHosts: ["lifedb.alijetham.com"] },
});
