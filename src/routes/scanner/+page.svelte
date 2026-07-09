<script lang="ts">
	import { X, Zap, Image, Check, Loader2 } from 'lucide-svelte';
	import { ecoState } from '$lib/ecoState.svelte';
	import { goto } from '$app/navigation';

	// 🔗여기에 네 티처블 머신 공유 링크를 넣어줘! (끝에 / 꼭 붙이기)
	const MODEL_URL = "https://teachablemachine.withgoogle.com/models/E0j02AqMS/"; 

	let videoElement: HTMLVideoElement | undefined = $state();
	let isModelLoading = $state(true);
	let isScanned = $state(false);
	let scannedItem = $state("");

	let realTimeStatus = $state("AI 분석 대기 중...");
	
	let model: any;
	let maxPredictions: number;
	let webCamLoop: number;

	$effect(() => {
		// app.html이 구글 스크립트를 다 불러올 때까지 안전하게 체크하며 대기하는 루프
		const interval = setInterval(() => {
			const globalWindow = window as any;
			if (globalWindow.tf && globalWindow.tmImage && videoElement) {
				clearInterval(interval);
				initAI(globalWindow.tmImage);
			}
		}, 100);

		return () => {
			clearInterval(interval);
			if (webCamLoop) cancelAnimationFrame(webCamLoop);
			if (videoElement && videoElement.srcObject) {
				const stream = videoElement.srcObject as MediaStream;
				stream.getTracks().forEach(track => track.stop());
			}
		};
	});

	async function initAI(tmImage: any) {
        try {
            const modelURL = MODEL_URL + "model.json";
            const metadataURL = MODEL_URL + "metadata.json";

            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' }, 
                audio: false 
            });
            
            if (videoElement) {
                videoElement.srcObject = stream;
                // 브라우저 자동재생 완벽 방어
                await videoElement.play().catch(e => console.log("자동재생 대기:", e));
            }
            
            isModelLoading = false;
            console.log("티처블 머신 모델 및 카메라 준비 완료! 루프 시작합니다.");
            
            // 📍 확실하게 비동기 순서를 맞춰서 루프 실행하기
            setTimeout(() => {
                predictLoop();
            }, 500);
            
        } catch (error) {
        console.error("AI 로딩 최종 실패:", error);
        // 📍 폰에서 왜 에러가 났는지 눈으로 볼 수 있게 경고창 띄우기
        alert("에러 발생! 사유: " + (error instanceof Error ? error.message : error));
        }
    }

    async function predictLoop() {
        // 루프가 돌기 시작하면 무조건 콘솔에 흔적을 남기기
        console.log("predictLoop 함수가 현재 실행 중입니다!");

        if (isScanned || !videoElement || !model) {
            console.log("조건 미달로 루프가 조기 종료됨:", { isScanned, hasVideo: !!videoElement, hasModel: !!model });
            return; 
        }

        try {
            const prediction = await model.predict(videoElement);
            
            // 가장 확률 높은 클래스 뽑기
            let highest = { className: "분석 중...", probability: 0 };
            for (let i = 0; i < maxPredictions; i++) {
                if (prediction[i].probability > highest.probability) {
                    highest = prediction[i];
                }
            }
            realTimeStatus = `${highest.className} (${(highest.probability * 100).toFixed(1)}%)`;

            // 매칭 로직 (Other가 아니고 확률 0.1 초과)
            for (let i = 0; i < maxPredictions; i++) {
                const className = prediction[i].className;
                const probability = prediction[i].probability;

                if (className !== "Other" && probability > 0.1) { 
                    console.log("🔥 매칭 성공! 스캔 완료 처리:", className, probability);
                    scannedItem = className;
                    isScanned = true;
                    break;
                }
            }
        } catch (predictError) {
            console.error("AI 예측 연산 중 에러 발생:", predictError);
        }

        // 스캔 안 됐으면 무조건 다음 프레임 강제 호출
        if (!isScanned) {
            webCamLoop = requestAnimationFrame(predictLoop);
        }
    }

// 2. 바뀐 클래스 이름에 맞게 포인트 지급 로직 수정
function handleClaim() {
    // 티처블 머신의 정확한 이름인 "Pet bottle"과 "Cans"로 매칭
    const points = scannedItem === "Pet bottle" ? 50 : 30;
    ecoState.claimPoints(points);
    goto('/');
}


</script>

<div class="flex-1 text-slate-900 relative flex flex-col justify-between overflow-hidden bg-black">
	
	<video 
    bind:this={videoElement} 
    class="absolute inset-0 w-full h-full object-cover z-0"
    playsinline
    autoplay  muted
	></video>

	<div class="relative z-10 p-5 flex items-center justify-between w-full bg-gradient-to-b from-black/60 to-transparent">
		<a href="/" class="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition">
			<X class="w-5 h-5" />
		</a>
		<div class="flex space-x-3">
			<button class="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Zap class="w-5 h-5" /></button>
			<button class="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Image class="w-5 h-5" /></button>
		</div>
	</div>

	{#if isModelLoading}
		<div class="relative z-10 flex-1 flex flex-col items-center justify-center space-y-4">
			<div class="bg-black/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 flex flex-col items-center space-y-2">
				<Loader2 class="w-6 h-6 text-emerald-400 animate-spin" />
				<span class="text-xs font-bold text-white">AI 카메라 구동 중...</span>
			</div>
		</div>
	{:else if !isScanned}
        <div class="relative z-10 flex-1 flex flex-col items-center justify-center space-y-4">
            <div class="w-64 h-64 border-2 border-emerald-400/70 rounded-3xl relative overflow-hidden shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <div class="absolute w-full h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-laser"></div>
            </div>
            
            <div class="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-center">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI 실시간 인식 상태</p>
                <p class="text-xs font-black text-emerald-400 tracking-wide mt-0.5">{realTimeStatus}</p>
            </div>
        </div>
    {/if}

<!-- 137번째 줄 근처 HTML 영역 전체 교체 -->
<div class="flex-1 text-slate-900 relative flex flex-col justify-between overflow-hidden bg-black">
    
    <video 
        bind:this={videoElement} 
        class="absolute inset-0 w-full h-full object-cover z-0"
        playsinline
        autoplay
        muted
    ></video>

    {#if isScanned}
        <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10 animate-fade-in"></div>

        <div class="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-[32px] px-6 pt-3 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] w-full flex flex-col animate-slide-up">
            <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4"></div>

            <div class="flex items-center space-x-4 mb-5">
                <div class="w-14 h-14 bg-[#EAF5F0] rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    {scannedItem === "Pet bottle" ? "♻️" : "🥫"}
                </div>
                <div class="flex flex-col">
                    <h3 class="text-xl font-extrabold tracking-tight text-slate-800">
                        {scannedItem === "Pet bottle" ? "페트병" : "알루미늄 캔"}
                    </h3>
                    <div class="flex items-center space-x-2 mt-1">
                        <span class="bg-[#EAF5F0] text-[#2A664E] text-[11px] font-bold px-2 py-0.5 rounded-md">인식 완료</span>
                        <span class="text-xs font-bold text-slate-400">• {scannedItem === "Pet bottle" ? "50" : "30"} Points</span>
                    </div>
                </div>
            </div>

            <div class="bg-[#F8FAFC] rounded-2xl p-4 mb-6 border border-slate-100">
                <div class="flex items-center space-x-1.5 mb-2">
                    <span class="text-sm">💡</span>
                    <h4 class="text-sm font-bold text-[#1E293B]">올바른 분리배출 방법</h4>
                </div>
                <p class="text-xs text-[#64748B] leading-relaxed font-medium">
                    {scannedItem === "Pet bottle" 
                        ? "내용물을 깨끗이 비우고 라벨지를 제거한 뒤, 압착해서 투명 페트병 전용 수거함에 버려주세요!" 
                        : "내용물을 비우고 물로 헹군 뒤, 발로 밟아 납착하게 압착하여 캔류 수거함에 버려주세요!"}
                </p>
            </div>

            <button 
                onclick={handleClaim}
                class="w-full bg-[#2A664E] text-white font-bold py-4 rounded-2xl text-base shadow-md transition-all active:scale-[0.98]"
            >
                포인트 적립하기
            </button>
        </div>

    {:else}
        <div class="relative z-10 flex-1 flex flex-col items-center justify-center space-y-4">
            <div class="w-64 h-64 border-2 border-emerald-400/70 rounded-3xl relative overflow-hidden shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <div class="absolute w-full h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-laser"></div>
            </div>
            
            <div class="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-center">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI 실시간 인식 상태</p>
                <p class="text-xs font-black text-emerald-400 tracking-wide mt-0.5">{realTimeStatus}</p>
            </div>
        </div>
    {/if}

</div>
</div>

<style>
	@keyframes laser {
		0% { top: 0%; }
		50% { top: 100%; }
		100% { top: 0%; }
	}
	.animate-laser {
		animation: laser 2s infinite linear;
	}

	@keyframes slideUp {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}
	.animate-slide-up {
		animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>