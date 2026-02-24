<script lang="ts">
    import { fly, scale, fade } from 'svelte/transition';
    import Tag from '$lib/components/Tag.svelte';

    export let name = 'Project Name';
    export let description = 'Project Description';
    export let image = 'https://via.placeholder.com/300';
    export let link = 'https://example.com';
    export let tags : { title : string, iconClass : string, component? : string }[] = [];

    let expanded = false;

    function closeModal() {
        expanded = false;
    }

    function handleBackdropClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape' && expanded) {
            closeModal();
        }
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

{#if expanded}
    <!-- Backdrop with blur -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
         on:click={handleBackdropClick}
         transition:fade={{ duration: 200 }}>
        <!-- Modal Card -->
        <div class="relative bg-[#222] border border-gray shadow-xl shadow-[#111] rounded-lg lg:w-2/3 w-full max-w-4xl max-h-[90vh] flex flex-col"
            transition:scale={{ duration: 300, start: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-label="Project details">
            <button class="absolute top-4 right-4 z-10 text-white text-2xl hover:text-pink transition-colors" 
                    on:click={closeModal}
                    aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            
            <!-- Scrollable content -->
            <div class="overflow-y-auto px-6 py-8 custom-scrollbar">
                <div class="flex flex-col items-center gap-6">
                    <img src={image} alt={name} class="w-full max-w-2xl h-auto rounded-lg object-contain" />
                    <div class="text-white text-center flex flex-col gap-4 w-full max-w-2xl">
                        <h2 class="text-2xl font-bold">{name}</h2>
                        <p class="text-lg leading-relaxed">{@html description}</p>
                        <div class="mt-2">
                            <p class="text-lg font-semibold mb-3">Technologies Used:</p>
                            <div class="flex justify-center gap-2 *:text-sm flex-wrap">
                                {#each tags as tag}
                                    <Tag 
                                        title={tag.title} 
                                        iconClass={tag.iconClass} 
                                        component={tag.component}
                                    />
                                {/each}
                            </div>
                        </div>
                        <a href={link} target="_blank" rel="noopener noreferrer" class="text-dark py-2 px-6 w-fit self-center font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-base cursor-pointer mt-2">View Project</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
<button class="w-full rounded-lg bg-[#222] border border-gray p-4 transition-all duration-200 hover:border-pink group" on:click={() => {expanded = !expanded}}
    transition:fly={{ y: 20, duration: 300 }}>
    <div class="flex justify-end gap-2 mb-4">
        <div class="bg-red w-3 h-3 rounded-full transition-transform group-hover:scale-110"></div>
        <div class="bg-yellow w-3 h-3 rounded-full transition-transform group-hover:scale-110"></div>
        <div class="bg-green w-3 h-3 rounded-full transition-transform group-hover:scale-110"></div>
    </div>
    <div class="mb-4">
        <img src={image} alt={name} class="w-full h-48 object-cover rounded-lg" />
    </div>
    <div>
        <h3 class="text-white text-xl font-semibold mb-2">{name}</h3>
        <div class="flex justify-center gap-2 *:text-sm flex-wrap">
            {#each tags as tag}
                <Tag 
                    title={tag.title} 
                    iconClass={tag.iconClass} 
                    component={tag.component}
                />
            {/each}
        </div>
    </div>
</button>
