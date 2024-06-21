<script lang="ts">
    import { fly } from 'svelte/transition';

    import ExpressIcon from '$lib/components/Icons/ExpressIcon.svelte';
    import SvelteIcon from '$lib/components/Icons/SvelteIcon.svelte';
    import CppIcon from '$lib/components/Icons/CppIcon.svelte';
    import MongodbIcon from '$lib/components/Icons/MongodbIcon.svelte';
    import MySQLIcon from '$lib/components/Icons/MySQLIcon.svelte';

    export let title: string = "";
    export let iconClass: string = "";
    export let component : string | undefined = undefined;

    let getIconByName = (name: string) => {
        switch(name) {
            case "ExpressIcon":
                return ExpressIcon;
            case "SvelteIcon":
                return SvelteIcon;
            case "CppIcon":
                return CppIcon;
            case "MongodbIcon":
                return MongodbIcon;
            case "MySQLIcon":
                return MySQLIcon;
            default:
                return null;
        }
    }

    let tooltipActive = false;

    function handleTagClick() {
        // Add a tooltip for the tag that shows the title
        // Only 1 tooltip should be visible at a time

        tooltipActive = !tooltipActive;

        if (tooltipActive) {
            setTimeout(() => {
                tooltipActive = false;
            }, 3000);
        }
    }
</script>

<style lang="scss">
    .tag {
        background-color: #333;
        padding: 0.25rem 0.5rem;
        border-radius: 5px;

        font-size: 1rem;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        position: relative;

        .tooltip {
            position: absolute;
            top: -100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 0.25rem 0.5rem;
            background-color: #333;
            color: white;
            border-radius: 5px;
            font-size: 0.75rem;
            z-index: 1000;
        }

        &:hover {
            cursor: pointer;
            background-color: #444;
        }

        i {
            color: white;
            margin: 0 0.25rem;
        }
    }
</style>

<button class="tag" on:click={handleTagClick}>
    {#if tooltipActive}
        <div class="tooltip" transition:fly={{y: 20, duration: 500}}>{title}</div>
    {/if}
    {#if component}
        <svelte:component this={getIconByName(component)} />
    {:else}
        <i class={iconClass}></i>
    {/if}
</button>