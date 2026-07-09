// src/lib/ecoState.svelte.ts

export interface Quest {
	id: number;
	text: string;
	points: number;
	completed: boolean;
	category: 'daily' | 'weekly';
}

class EcoState {
	// 전역 포인트 상태
	points = $state(0);
	
	// 퀘스트 리스트 상태
	quests = $state<Quest[]>([
		{ id: 1, text: "페트병 1개 스캔하기", points: 50, completed: false, category: 'daily' },
		{ id: 2, text: "종이팩 깨끗이 씻어서 버리기", points: 30, completed: false, category: 'daily' },
		{ id: 3, text: "텀블러 사용 인증하기", points: 40, completed: false, category: 'daily' },
		{ id: 4, text: "일주일 동안 플라스틱 배출 줄이기", points: 200, completed: false, category: 'weekly' },
		{ id: 5, text: "친환경 제품 사용하고 리뷰 남기기", points: 150, completed: false, category: 'weekly' },
	]);

	// 포인트 직접 추가 (스캔 성공 시 사용)
	claimPoints(amount: number) {
		this.points += amount;
	}

	// 퀘스트 체크박스 토글 함수 (체크하면 포인트 지급, 해제하면 회수)
	toggleQuest(id: number) {
		const quest = this.quests.find(q => q.id === id);
		if (quest) {
			quest.completed = !quest.completed;
			if (quest.completed) {
				this.points += quest.points;
			} else {
				this.points -= quest.points;
			}
		}
	}
}

export const ecoState = new EcoState();