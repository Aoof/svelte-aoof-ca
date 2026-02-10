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

<svelte:window on:keydown={handleKeydown} />

{#if expanded}
    <!-- Backdrop with blur -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
         on:click={handleBackdropClick}
         transition:fade={{ duration: 200 }}>
        <!-- Modal Card -->
        <div class="relative bg-[#222] shadow-xl shadow-[#111] px-4 py-12 rounded-lg lg:w-1/2 w-full lg:h-3/4 h-full flex flex-col justify-center items-center max-h-[90vh] overflow-y-auto"
            transition:scale={{ duration: 300, start: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-label="Project details">
            <button class="absolute top-4 right-4 text-white text-2xl hover:text-pink transition-colors" 
                    on:click={closeModal}
                    aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            <img src={image} alt={name} class="lg:h-1/2 w-auto rounded-md" />
            <div class="text-white text-center mt-4 flex flex-col gap-3 justify-center">
                <p class="text-lg">{description}</p>
                <p class="mt-4 text-lg">Using the following technologies: </p>
                <div class="flex justify-center gap-2 my-2 *:text-sm flex-wrap">
                    {#each tags as tag}
                        <Tag 
                            title={tag.title} 
                            iconClass={tag.iconClass} 
                            component={tag.component}
                        />
                    {/each}
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" class="text-dark py-2 px-4 w-fit self-center font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">View Project</a>
            </div>
        </div>
    </div>
{/if}
<button class="w-full rounded-lg bg-[#222] border border-[#2f2f2f] px-4 pt-4 pb-12 transition-all duration-200 hover:bg-[#2f2f2f]" on:click={() => {expanded = !expanded}}
    transition:fly={{ y: 20, duration: 300 }}>
    <div class="flex justify-end gap-2 mb-4">
        <div class="bg-red w-3 h-3 rounded-full"></div>
        <div class="bg-yellow w-3 h-3 rounded-full"></div>
        <div class="bg-green w-3 h-3 rounded-full"></div>
    </div>
    <div>
        <img src={image} alt={name} class="w-full h-auto" />
    </div>
    <div class="mt-4">
        <h3 class="text-white">{name}</h3>
        <div class="flex justify-center gap-2 mt-2 *:text-sm flex-wrap">
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
