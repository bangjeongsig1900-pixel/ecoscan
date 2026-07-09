<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { ecoState } from '$lib/ecoState.svelte';
	// ChevronRight, Home, Settings 아이콘 추가 임포트
	import { Bell, Check, Camera, Leaf, Droplet, Flame, BarChart3, ChevronRight, Home, Settings } from 'lucide-svelte';

	// 전역 상태에서 일일 미션(daily)만 필터링해서 가져오기
	const dailyQuests = $derived(ecoState.quests.filter(q => q.category === 'daily'));
</script>

<!-- 하단 네비게이션 바 공간을 확보하기 위해 pb-6을 pb-24로 변경 -->
<div class="flex-1 overflow-y-auto pb-24 scrollbar-hide">
	
	<!-- [상단] 프로필 및 포인트 카드 영역 (설정 페이지 /settings 연동 완려) -->
	<div class="bg-[#2A664E] text-white px-6 pt-8 pb-10 rounded-b-[36px] shadow-sm">
		<div class="flex items-center justify-between">
			
			<!-- 프로필 클릭 시 설정(/settings) 페이지로 이동 -->
			<a href="/settings" class="flex items-center space-x-3 group transition-all active:scale-95">
				<div class="w-12 h-12 bg-white text-[#2A664E] rounded-full flex items-center justify-center font-bold text-lg border-2 border-emerald-200 group-hover:scale-105 transition-transform">
					JD
				</div>
				<div>
					<h2 class="text-lg font-bold leading-tight group-hover:text-emerald-200 transition-colors">Hello, Jane</h2>
					<p class="text-xs text-emerald-300/80">Eco-Warrior Level 04</p>
				</div>
			</a>

			<a href="/notifications" class="w-10 h-10 bg-[#347A5E] rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 relative">
				<Bell class="w-5 h-5 text-white" />
				<span class="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
			</a>
		</div>

		<!-- 실시간 전역 포인트 연동 -->
		<div class="mt-8">
			<p class="text-xs tracking-wider text-emerald-100 uppercase font-semibold">Total Eco Points</p>
			<div class="flex items-baseline space-x-2 mt-1">
				<span class="text-4xl font-extrabold tracking-tight">{ecoState.points.toLocaleString()}</span>
				<span class="text-sm font-medium text-emerald-200">pts</span>
			</div>
		</div>

		<div class="mt-6">
			<div class="flex justify-between text-xs text-emerald-100 mb-2 font-medium">
				<span>Weekly Goal</span>
				<span>75%</span>
			</div>
			<div class="w-full h-2.5 bg-[#1F4D3A] rounded-full overflow-hidden">
				<div class="h-full bg-[#d3e5b6] rounded-full" style="width: 75%"></div>
			</div>
		</div>
	</div>

	<!-- [중앙 1] 3개 스탯 배지 -->
	<div class="px-5 mt-6 grid grid-cols-3 gap-3">
		<div class="bg-white px-3 py-2.5 rounded-full shadow-sm flex items-center justify-center space-x-1.5 border border-emerald-50">
			<Leaf class="w-4 h-4 text-emerald-600" />
			<span class="text-xs font-bold text-slate-700">12kg CO2</span>
		</div>
		<div class="bg-white px-3 py-2.5 rounded-full shadow-sm flex items-center justify-center space-x-1.5 border border-emerald-50">
			<Droplet class="w-4 h-4 text-emerald-500" />
			<span class="text-xs font-bold text-slate-700">48 Bottles</span>
		</div>
		<div class="bg-white px-3 py-2.5 rounded-full shadow-sm flex items-center justify-center space-x-1.5 border border-emerald-50">
			<Flame class="w-4 h-4 text-orange-500" />
			<span class="text-xs font-bold text-slate-700">5 Day</span>
		</div>
	</div>

	<!-- [중앙 2] 미션 리스트 영역 -->
	<div class="px-5 mt-8">
		<div class="flex justify-between items-center mb-4">
			<h3 class="text-lg font-extrabold tracking-tight">Daily Missions</h3>
			<a href="/quests" class="text-sm font-semibold text-[#2A664E] hover:underline">View All</a>
		</div>

		<div class="space-y-3.5">
			{#each dailyQuests as quest}
				<button 
					type="button"
					onclick={() => ecoState.toggleQuest(quest.id)}
					class="w-full bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between text-left transition active:scale-[0.99] border {quest.completed ? 'border-emerald-100 bg-slate-50/40 opacity-75' : 'border-emerald-50'}"
				>
					<div class="flex items-center space-x-4">
						<div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg {quest.completed ? 'bg-[#F0F7F4] text-emerald-700' : 'bg-slate-50 text-slate-500'}">
							{#if quest.id === 1}♻️{:else if quest.id === 2}🫙{:else if quest.id === 3}📷{:else}🍃{/if}
						</div>
						<div>
							<h4 class="text-sm font-bold {quest.completed ? 'text-slate-400 line-through' : 'text-slate-800'}">
								{quest.text}
							</h4>
							<p class="text-xs mt-0.5 {quest.completed ? 'text-emerald-600 font-semibold' : 'text-slate-400 font-medium'}">
								+{quest.points} pts
							</p>
						</div>
					</div>

					{#if quest.completed}
						<div class="w-6 h-6 bg-[#2A664E] text-white rounded-md flex items-center justify-center shrink-0">
							<Check class="w-4 h-4 stroke-3" />
						</div>
					{:else}
						<div class="w-6 h-6 border-2 border-slate-200 rounded-md shrink-0"></div>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- [하단] 통계 그래프 영역 (더보기 버튼 추가) -->
	<div class="px-5 mt-8">
		<div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center space-x-2">
					<BarChart3 class="w-4 h-4 text-[#2A664E]" />
					<h4 class="text-sm font-black text-slate-800 tracking-wide">Impact Overview</h4>
				</div>
				<!-- 💡 그래프 우측에 추가된 아주 작은 더보기 버튼 -->
				<a href="/overview" class="text-[11px] font-bold text-slate-400 hover:text-[#2A664E] flex items-center transition active:scale-95">
					<span>더보기</span>
					<ChevronRight class="w-3 h-3 ml-0.5" />
				</a>
			</div>
			
			<div class="h-36 w-full flex items-end justify-between px-2 pt-4 pb-1 bg-slate-50 rounded-xl border border-slate-100">
				<div class="flex flex-col items-center space-y-2 w-8">
					<div class="w-3.5 bg-emerald-200 h-16 rounded-t-full"></div>
					<span class="text-[10px] font-bold text-slate-400">Mon</span>
				</div>
				<div class="flex flex-col items-center space-y-2 w-8">
					<div class="w-3.5 bg-emerald-200 h-24 rounded-t-full"></div>
					<span class="text-[10px] font-bold text-slate-400">Tue</span>
				</div>
				<div class="flex flex-col items-center space-y-2 w-8">
					<div class="w-3.5 bg-[#2A664E] h-28 rounded-t-full"></div>
					<span class="text-[10px] font-bold text-[#2A664E]">Wed</span>
				</div>
				<div class="flex flex-col items-center space-y-2 w-8">
					<div class="w-3.5 bg-emerald-200 h-12 rounded-t-full"></div>
					<span class="text-[10px] font-bold text-slate-400">Thu</span>
				</div>
				<div class="flex flex-col items-center space-y-2 w-8">
					<div class="w-3.5 bg-emerald-300 h-20 rounded-t-full"></div>
					<span class="text-[10px] font-bold text-slate-400">Fri</span>
				</div>
				<div class="flex flex-col items-center space-y-2 w-8">
					<div class="w-3.5 bg-emerald-200 h-8 rounded-t-full"></div>
					<span class="text-[10px] font-bold text-slate-400">Sat</span>
				</div>
			</div>
			<p class="text-[11px] text-slate-400 text-center mt-3 font-medium">이번 주에는 플라스틱 분리배출을 가장 많이 실천했어요!</p>
		</div>
	</div>

</div>

<!-- 플로팅 카메라 버튼 (기존 위치 및 디자인 유지) -->
<a href="/scanner" class="absolute bottom-24 right-6 w-16 h-16 bg-[#2A664E] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#22523E] hover:scale-105 active:scale-95 transition-all z-40">
	<Camera class="w-7 h-7 stroke-2" />
</a>

<!-- 💡 깔끔하게 하단에 추가된 고정 네비게이션 바 (설정 페이지 연동 완료) -->
<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
	<a href="/scanner" class="flex flex-col items-center space-y-0.5 text-slate-400 hover:text-[#2A664E] transition active:scale-95">
		<Camera class="w-5 h-5" />
		<span class="text-[10px] font-medium">Scan</span>
	</a>
	<a href="/" class="flex flex-col items-center space-y-0.5 text-[#2A664E] transition active:scale-95">
		<Home class="w-5 h-5" />
		<span class="text-[10px] font-bold">Home</span>
	</a>
	<a href="/settings" class="flex flex-col items-center space-y-0.5 text-slate-400 hover:text-[#2A664E] transition active:scale-95">
		<Settings class="w-5 h-5" />
		<span class="text-[10px] font-medium">Settings</span>
	</a>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>