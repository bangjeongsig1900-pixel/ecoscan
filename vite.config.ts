import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    // 📍 여기에 네 깃허브 저장소 이름을 슬래시 사이에 꼭 적어줘!
    // 예: 저장소 이름이 eco-scan 이라면 base: '/eco-scan/',
    base: '/네_깃허브_저장소_이름/', 

    plugins: [
        tailwindcss(),
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            adapter: adapter()
        })
    ],
    server: {
        allowedHosts: true
    }
});