import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        // adapter 부분을 아래처럼 객체 형태로 바꾸고 fallback을 지정해줘!
        adapter: adapter({
            fallback: '404.html' // GitHub Pages 호스팅용 프리패스 티켓이야
        })
    }
};

export default config;