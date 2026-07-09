<script lang="ts">
	import { ArrowLeft, Bell, CheckCircle2, Leaf, Award } from 'lucide-svelte';

	// 샘플 알림 데이터 리스트
	const notifications = [
		{
			id: 1,
			type: 'point',
			title: '포인트 적립 완료',
			message: '플라스틱 페트병 스캔 미션을 완료하여 50pts를 획득했습니다.',
			time: '방금 전',
			isNew: true,
			icon: Leaf,
			iconClass: 'bg-emerald-50 text-[#2A664E]'
		},
		{
			id: 2,
			type: 'level',
			title: '레벨업 도전 가능!',
			message: '주간 목표 달성률이 75%를 돌파했습니다. 조금만 더 힘내세요!',
			time: '2시간 전',
			isNew: true,
			icon: Award,
			iconClass: 'bg-amber-50 text-amber-600'
		},
		{
			id: 3,
			type: 'system',
			title: '월요일 새로운 미션 오픈',
			message: '이번 주 일일 미션이 새롭게 갱신되었습니다. 확인해 보세요.',
			time: '1일 전',
			isNew: false,
			icon: Bell,
			iconClass: 'bg-slate-50 text-slate-500'
		}
	];
</script>

<div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
	
	<div class="bg-white border-b border-slate-100 px-4 py-4 pt-12 flex items-center sticky top-0 z-50">
		<a href="/" class="p-2 text-slate-600 hover:text-[#2A664E] transition active:scale-95">
			<ArrowLeft class="w-5 h-5" />
		</a>
		<h1 class="text-base font-bold text-slate-800 ml-2">알림</h1>
	</div>

	<div class="flex-1 p-5 space-y-3">
		{#if notifications.length === 0}
			<div class="flex flex-col items-center justify-center pt-24 text-slate-400">
				<Bell class="w-12 h-12 stroke-1 mb-3 text-slate-300" />
				<p class="text-sm font-medium">새로운 알림이 없습니다.</p>
			</div>
		{:else}
			{#each notifications as notice}
				<div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-3.5 relative transition active:bg-slate-50/50">
					{#if notice.isNew}
						<span class="absolute top-4 right-4 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
					{/if}

					<div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 {notice.iconClass}">
						<svelte:component this={notice.icon} class="w-5 h-5" />
					</div>

					<div class="flex-1 pr-4">
						<div class="flex items-center space-x-1.5">
							<h4 class="text-sm font-bold text-slate-800">{notice.title}</h4>
						</div>
						<p class="text-xs text-slate-500 mt-1 leading-relaxed">{notice.message}</p>
						<span class="text-[10px] text-slate-400 font-medium block mt-2">{notice.time}</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>