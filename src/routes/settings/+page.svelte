<script lang="ts">
	import { 
		User, Bell, Moon, Shield, HelpCircle, 
		LogOut, ChevronRight, Award, ChevronLeft 
	} from 'lucide-svelte';
	import { ecoState } from '$lib/ecoState.svelte'; // 전역 상태 연동!

	// Svelte 5 로컬 상태 정의 (토글 스위치용)
	let isNotificationOn = $state(true);
	let isDarkModeOn = $state(false);
</script>

<div class="flex-1 overflow-y-auto pb-24 scrollbar-hide bg-[#F8FAFC]">
	
	<div class="bg-white border-b border-slate-100 px-6 py-5 sticky top-0 z-30 flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<a href="/" class="text-slate-400 hover:text-slate-600 transition md:hidden">
				<ChevronLeft class="w-6 h-6" />
			</a>
			<h1 class="text-xl font-black text-slate-800 tracking-tight">Settings</h1>
		</div>
		<span class="text-xs font-bold text-[#2A664E] bg-[#E8F4EE] px-2.5 py-1 rounded-full">v1.0.0</span>
	</div>

	<div class="p-5">
		<div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<div class="w-14 h-14 bg-[#2A664E] text-white rounded-full flex items-center justify-center font-black text-xl border-2 border-emerald-100 shadow-inner">
					JD
				</div>
				<div>
					<h3 class="font-black text-slate-800 text-base">Jane Doe</h3>
					<p class="text-xs text-slate-400 font-medium mt-0.5">jane.doe@eco.com</p>
					
					<div class="flex items-center space-x-1.5 mt-2 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 w-fit">
						<Award class="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
						<span class="text-[11px] font-bold text-slate-600">Lv.4 Eco-Warrior</span>
					</div>
				</div>
			</div>
			
			<div class="text-right">
				<p class="text-[10px] font-bold text-slate-400 tracking-wider uppercase">My Points</p>
				<p class="text-lg font-black text-[#2A664E] mt-0.5">{ecoState.points.toLocaleString()}P</p>
			</div>
		</div>
	</div>

	<div class="px-5 space-y-2">
		<h4 class="text-xs font-black text-slate-400 tracking-wider uppercase pl-1">Account</h4>
		
		<div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
			<button class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#2A664E] flex items-center justify-center">
						<User class="w-4 h-4" />
					</div>
					<span class="text-xs font-bold text-slate-700">Edit Profile</span>
				</div>
				<ChevronRight class="w-4 h-4 text-slate-300" />
			</button>

			<button class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#2A664E] flex items-center justify-center">
						<Shield class="w-4 h-4" />
					</div>
					<span class="text-xs font-bold text-slate-700">Security & Password</span>
				</div>
				<ChevronRight class="w-4 h-4 text-slate-300" />
			</button>
		</div>
	</div>

	<div class="px-5 mt-6 space-y-2">
		<h4 class="text-xs font-black text-slate-400 tracking-wider uppercase pl-1">Preferences</h4>
		
		<div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
			<div class="px-4 py-3.5 flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
						<Bell class="w-4 h-4" />
					</div>
					<span class="text-xs font-bold text-slate-700">Push Notifications</span>
				</div>
				<button 
					onclick={() => isNotificationOn = !isNotificationOn}
					class="w-10 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none {isNotificationOn ? 'bg-[#2A664E]' : 'bg-slate-200'}"
				>
					<div class="bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 {isNotificationOn ? 'translate-x-4' : 'translate-x-0'}"></div>
				</button>
			</div>

			<div class="px-4 py-3.5 flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
						<Moon class="w-4 h-4" />
					</div>
					<span class="text-xs font-bold text-slate-700">Dark Mode</span>
				</div>
				<button 
					onclick={() => isDarkModeOn = !isDarkModeOn}
					class="w-10 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none {isDarkModeOn ? 'bg-[#2A664E]' : 'bg-slate-200'}"
				>
					<div class="bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 {isDarkModeOn ? 'translate-x-4' : 'translate-x-0'}"></div>
				</button>
			</div>
		</div>
	</div>

	<div class="px-5 mt-6 space-y-2">
		<h4 class="text-xs font-black text-slate-400 tracking-wider uppercase pl-1">Support</h4>
		
		<div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
			<button class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
						<HelpCircle class="w-4 h-4" />
					</div>
					<span class="text-xs font-bold text-slate-700">Help Center & FAQ</span>
				</div>
				<ChevronRight class="w-4 h-4 text-slate-300" />
			</button>

			<button class="w-full px-4 py-3.5 flex items-center justify-between text-rose-600 hover:bg-rose-50/50 transition text-left">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
						<LogOut class="w-4 h-4" />
					</div>
					<span class="text-xs font-bold">Sign Out</span>
				</div>
			</button>
		</div>
	</div>

</div>

<style>
	/* 스크롤바 숨기기 */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>