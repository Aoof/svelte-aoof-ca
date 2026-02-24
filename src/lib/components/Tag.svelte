<script lang="ts">
    import ExpressIcon from '$lib/components/Icons/ExpressIcon.svelte';
    import SvelteIcon from '$lib/components/Icons/SvelteIcon.svelte';
    import CppIcon from '$lib/components/Icons/CppIcon.svelte';
    import MongodbIcon from '$lib/components/Icons/MongodbIcon.svelte';
    import MySQLIcon from '$lib/components/Icons/MySQLIcon.svelte';
    import HetznerIcon from './Icons/HetznerIcon.svelte';
    import ShopifyIcon from './Icons/ShopifyIcon.svelte';
    import CsharpIcon from './Icons/CsharpIcon.svelte';
    import NeovimIcon from './Icons/NeovimIcon.svelte';
    import TailwindIcon from './Icons/TailwindIcon.svelte';
    import TypescriptIcon from './Icons/TypescriptIcon.svelte';
    import AltagramIcon from './Icons/AltagramIcon.svelte';

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
            case "HetznerIcon":
                return HetznerIcon;
            case "ShopifyIcon":
                return ShopifyIcon;
            case "CsharpIcon":
                return CsharpIcon;
            case "NeovimIcon":
                return NeovimIcon;
            case "TailwindIcon":
                return TailwindIcon;
            case "TypescriptIcon":
                return TypescriptIcon;
            case "AltagramIcon":
                return AltagramIcon;
            default:
                return null;
        }
    }
</script>

<span class="tag bg-[#444] px-3 py-1 m-1 rounded flex items-center gap-2 cursor-default text-base relative">
    {#if component}
        <span class="inline-flex items-center justify-center w-[1.1em] h-[1.1em] mx-1 shrink-0 [&>*]:!w-full [&>*]:!h-full [&>*]:!m-0">
            <svelte:component this={getIconByName(component)} />
        </span>
        <p class="text-gray-400">{title}</p>
    {:else}
        {#if iconClass != ""}
            <i class={iconClass + " text-white mx-1"}></i>
        {/if}
        <p class="text-gray-400">{title}</p>
    {/if}
</span>
