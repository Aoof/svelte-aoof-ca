<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import { language } from '$lib/../stores/index';
    import type { SiteSettings } from '$lib/content/types';

    export let open = false;
    export let settings: SiteSettings;
    
    let isViewingResume = false;

    function closeModal() {
        isViewingResume = false;
        open = false;
    }

    function downloadResume() {
        const link = document.createElement('a');
    link.href = $language === 'fr' ? settings.resume.french : settings.resume.english;
        link.download = 'amousaresume.pdf';
        link.click();
        closeModal();
    }

    function viewResume() {
        isViewingResume = true;
    }

    function handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && open) {
            closeModal();
        }
    }

    // Reset viewing state when modal is opened
    $: if (open) {
        isViewingResume = false;
    }
</script>

<style>
    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #d946ef20 transparent;
    }

    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #d946ef20;
        border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #d946ef40;
    }
</style>

<svelte:window on:keydown={handleKeydown} />

{#if open}
    <!-- Resume Modal Backdrop -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
         on:click={handleBackdropClick}
         transition:fade={{ duration: 200 }}>
        <!-- Modal Card -->
        <div class="relative bg-[#222] border border-gray shadow-xl shadow-[#111] rounded-lg {isViewingResume ? 'w-full max-w-6xl' : 'w-fit'} flex flex-col"
            transition:scale={{ duration: 300, start: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume options">
            <button class="absolute top-4 right-4 z-10 text-white text-2xl hover:text-pink transition-colors" 
                    on:click={closeModal}
                    aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            
            {#if !isViewingResume}
                <!-- Resume Options -->
                <div class="px-6 py-8 flex flex-col items-center gap-6">
                    <h2 class="text-white text-2xl font-bold">{settings.ui.resume.title}</h2>
                    <p class="text-white text-center text-lg">{settings.ui.resume.prompt}</p>
                    <div class="flex gap-4 flex-wrap justify-center">
                        <button class="text-white py-3 px-8 font-bold rounded border border-pink hover:bg-pink/10 transition-all ease-out text-base cursor-pointer" on:click={viewResume}>
                            {settings.ui.resume.preview}
                        </button>
                        <button class="text-dark py-3 px-8 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-base cursor-pointer" on:click={downloadResume}>
                            {settings.ui.resume.download}
                        </button>
                    </div>
                </div>
            {:else}
                <!-- PDF Viewer -->
                <div class="overflow-y-auto px-6 py-8 custom-scrollbar flex-1">
                    <div class="flex flex-col items-center gap-4 h-full">
                        <h2 class="text-white text-2xl font-bold">{settings.ui.resume.preview}</h2>
                        <iframe 
                                     src={$language === 'fr' ? settings.resume.french : settings.resume.english}
                            class="w-full h-[70vh] rounded-lg border border-gray"
                            title="Resume PDF Viewer"
                            frameborder="0"
                        ></iframe>
                        <button class="text-dark py-2 px-6 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-base cursor-pointer" on:click={downloadResume}>
                            {settings.ui.resume.download}
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}
