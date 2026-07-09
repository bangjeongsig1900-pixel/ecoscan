<script lang="ts">
	import './layout.css'; // 👈 여기를 내 프로젝트 설정에 맞게 수정했어!
	import { page } from '$app/stores'; // 현재 주소를 가져오기 위한 스토어
	import { Camera, Home, Settings } from 'lucide-svelte';

	// 현재 주소 감지 (Svelte 5 룬 문법)
	let activePath = $derived($page.url.pathname as string);

	// 하위 페이지들을 통째로 받아오는 문법
	let { children } = $props();
</script>

<div class="mx-auto h-screen max-w-md bg-[#F4F9F5] text-[#1E3A2F] shadow-2xl relative flex flex-col font-sans select-none overflow-hidden">
	
	<div class="flex-1 overflow-hidden relative flex flex-col">
		{@render children()}
	</div>

	<nav class="bg-white border-t border-emerald-50 h-20 flex items-center justify-around px-4 pb-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50">
		
		<a href="/scanner" class="flex flex-col items-center space-y-1 flex-1 group">
			<Camera class="w-6 h-6 {activePath === '/scanner' ? 'text-[#2A664E] stroke-[2.5]' : 'text-slate-400 stroke-2'} group-hover:scale-105 transition-transform" />
			<span class="text-[11px] font-bold {activePath === '/scanner' ? 'text-[#2A664E]' : 'text-slate-400'}">Scan</span>
		</a>

		<a href="/" class="flex flex-col items-center space-y-1 flex-1 group">
			<Home class="w-6 h-6 {activePath === '/' ? 'text-[#2A664E] stroke-[2.5]' : 'text-slate-400 stroke-2'} group-hover:scale-105 transition-transform" />
			<span class="text-[11px] font-bold {activePath === '/' ? 'text-[#2A664E]' : 'text-slate-400'}">Home</span>
		</a>

		<a href="/settings" class="flex flex-col items-center space-y-1 flex-1 group">
			<Settings class="w-6 h-6 {activePath === '/settings' ? 'text-[#2A664E] stroke-[2.5]' : 'text-slate-400 stroke-2'} group-hover:scale-105 transition-transform" />
			<span class="text-[11px] font-bold {activePath === '/settings' ? 'text-[#2A664E]' : 'text-slate-400'}">Settings</span>
		</a>

	</nav>
</div>