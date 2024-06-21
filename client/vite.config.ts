import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'


export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
		  compiler: 'svelte',
		})
	],
	server: {
        proxy: {
            '/api': 'http://localhost:5000',
			'/socket': 'http://localhost:5000'
        },
    },
});
