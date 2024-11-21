<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import Tag from '$lib/components/Tag.svelte';

    export let name = 'Project Name';
    export let description = 'Project Description';
    export let image = 'https://via.placeholder.com/300';
    export let link = 'https://example.com';
    export let tags : { title : string, iconClass : string, component? : string }[] = [];

    let expanded = false;
</script>

{#if expanded}
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="relative bg-[#222] shadow-md shadow-[#111] px-4 py-12 rounded-lg lg:w-1/2 w-full lg:h-3/4 h-full flex flex-col justify-center items-center"
            transition:scale={{ duration: 300 }}>
            <button class="absolute top-4 right-4 text-white text-2xl" on:click={() => expanded = !expanded}>
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
<button class="w-full rounded-lg md:mx-3 bg-[#222] border border-[#2f2f2f] px-4 pt-4 pb-12 transition-all duration-200 hover:bg-[#2f2f2f]" on:click={() => {expanded = !expanded}}
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
