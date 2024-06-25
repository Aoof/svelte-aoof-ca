<script lang="ts">
    import { fly } from 'svelte/transition';
    import Tag from '$lib/components/Tag.svelte';
    import type { SvelteComponent } from 'svelte';

    export let name;
    export let description;
    export let image;
    export let link;
    export let tags : { title : string, iconClass : string, component? : string }[] = [];

    let expanded = false;
</script>

<style lang="scss">
    .project-card {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 1rem;
        overflow: hidden;

        background-color: rgb(40, 40, 40);
        padding: 1rem;

        transition: all 0.2s;

        &:hover {
            cursor: pointer;
            background: rgb(50, 50, 50);
        }
    }

    .project-card-header {
        img {
            width: 100%;
            height: auto;
        }
    }

    .project-card-body {
        padding: 1rem;
        h3 {
            margin: 0;
        }
    }

    .project-card-tags {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
        justify-content: center;
    }

    .project-card-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(40, 40, 40);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        img {
            width: 50%;
            height: auto;
            border-radius: 5px;
        }
        button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background-color: transparent;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
        }
        .project-card-overlay-content {
            padding: 1rem;
            color: #fff;
            text-align: center;
            a {
                display: inline-block;
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background-color: #333;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        }
    }
</style>

{#if expanded}
    <div class="project-card-overlay" transition:fly={{ y: -20, duration: 500 }}>
        <button on:click={() => expanded = !expanded}>
            <i class="fas fa-times"></i>
        </button>
        <img src={image} alt={name} />
        <div class="project-card-overlay-content *:my-4">
            <p>{description}</p>
            <p>
                Using the following technologies:
                {#each tags as tag}
                    <Tag 
                        title={tag.title} 
                        iconClass={tag.iconClass} 
                        component={tag.component}
                    />
                {/each}
            </p>
            <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
    </div>
{/if}
<button class="project-card xl:w-1/3 w-full rounded-lg mx-3" on:click={() => {expanded = !expanded}}>
    <div class="window-controls flex justify-end gap-2">
        <div class="window-control bg-red w-3 h-3 rounded-full"></div>
        <div class="window-control bg-yellow w-3 h-3 rounded-full"></div>
        <div class="window-control bg-green w-3 h-3 rounded-full"></div>
    </div>
    <div class="project-card-header">
        <img src={image} alt={name} />
    </div>
    <div class="project-card-body">
        <h3>{name}</h3>
        <div class="project-card-tags text-center">
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