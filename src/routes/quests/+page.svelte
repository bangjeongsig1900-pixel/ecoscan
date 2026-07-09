<script lang="ts">
	import { ecoState } from '$lib/ecoState.svelte';
	import { ChevronLeft, CheckCircle2, Circle, Calendar, Trophy } from 'lucide-svelte';

	// 현재 선택된 탭 종류 ('daily' 또는 'weekly')
	let currentTab = $state<'daily' | 'weekly'>('daily');

	// 현재 탭에 맞는 퀘스트들 필터링
	const filteredQuests = $derived(ecoState.quests.filter(q => q.category === currentTab));

	// 진행률 계산 루틴
	const totalCount = $derived(ecoState.quests.length);
	const completedCount = $derived(ecoState.quests.filter(q => q.completed).length);
	const progressPercent = $derived(totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);
</script>

<div class="min-h-screen bg-slate-50 text-slate-900 pb-12">
	
	<div class="p-6 pt-12 bg-white border-b border-slate-100 flex items-center space-x-3">
		<a href="/" class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition">
			<ChevronLeft class="w-5 h-5 text-slate-600" />
		</a>
		<h1 class="text-lg font-black text-slate-800 tracking-tight">전체 에코 미션</h1>
	</div>

	<div class="p-6">
		<div class="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
			<div class="flex justify-between items-center mb-2.5">
				<span class="text-xs font-black text-slate-500">전체 미션 달성도</span>
				<span class="text-xs font-black text-[#2A664E]">{completedCount} / {totalCount} 완료 ({progressPercent}%)</span>
			</div>
			<div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
				<div class="h-full bg-[#2A664E] transition-all duration-500 ease-out" style="width: {progressPercent}%"></div>
			</div>
		</div>

		<div class="flex bg-slate-200/60 p-1 rounded-xl mt-6 mb-4">
			<button 
				onclick={() => currentTab = 'daily'} 
				class="flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all {currentTab === 'daily' ? 'bg-white text-[#2A664E] shadow-sm' : 'text-slate-500'}"
			>
				<Calendar class="w-3.5 h-3.5" />
				<span>일일 미션</span>
			</button>
			<button 
				onclick={() => currentTab = 'weekly'} 
				class="flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all {currentTab === 'weekly' ? 'bg-white text-[#2A664E] shadow-sm' : 'text-slate-500'}"
			>
				<Trophy class="w-3.5 h-3.5" />
				<span>주간 미션</span>
			</button>
		</div>

		<div class="space-y-3">
			{#each filteredQuests as quest}
				<button 
					onclick={() => ecoState.toggleQuest(quest.id)}
					class="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between text-left transition-all active:scale-[0.99] {quest.completed ? 'opacity-60 bg-slate-50/50' : ''}"
				>
					<div class="flex items-center space-x-3.5 pr-4">
						{#if quest.completed}
							<CheckCircle2 class="w-5 h-5 text-[#2A664E] shrink-0" />
						{:else}
							<Circle class="w-5 h-5 text-slate-300 shrink-0" />
						{/if}
						<span class="text-xs font-bold tracking-tight text-slate-700 {quest.completed ? 'line-through text-slate-400' : ''}">
							{quest.text}
						</span>
					</div>
					<span class="text-[11px] font-black px-2 py-1 rounded-md shrink-0 {quest.completed ? 'bg-slate-100 text-slate-400' : 'bg-[#E8F4EE] text-[#2A664E]'}">
						+{quest.points}P
					</span>
				</button>
			{:else}
				<div class="text-center py-12 text-xs font-bold text-slate-400">
					해당 카테고리의 미션이 준비되지 않았어!
				</div>
			{/each}
		</div>
	</div>
</div>