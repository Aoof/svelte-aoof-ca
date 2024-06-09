<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let text;
    export let className = '';

    const dispatch = createEventDispatcher();

    function handleClick() { dispatch('click'); }
</script>

<!-- Tailwind btn -->
<button 
    class={className} 
    on:click={handleClick}
    {...$$restProps}>
    {@html text}
</button>

<style lang="scss">
    button {
        padding: 0.5rem 1.4rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        background-color: rgba(40, 40, 40);
        font-size: 1rem;
        &:hover {
            filter: brightness(0.9);
        }
        &:disabled {
            background-color: rgba(0, 0, 0, 0.5);
            cursor: not-allowed;
        }
    }
</style>