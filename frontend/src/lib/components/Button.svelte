<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let text : string;
    export let type = "button";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("click");
    }
</script>

<!-- Tailwind btn -->
 
{#if type === 'button'}
    <button on:click={handleClick} {...$$restProps}>
        {@html text}
    </button>
{:else}
    <input type="submit" {...$$restProps} bind:value={text} />
{/if}

<style lang="scss">
    button,
    input[type="submit"] {
        padding: 0.5rem 1.4rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        background-color: rgba(40, 40, 40);
        font-size: 1rem;
        user-select: none;
        &:hover {
            filter: brightness(0.9);
        }
        &:disabled {
            background-color: rgba(0, 0, 0, 0.5);
            cursor: not-allowed;
        }

        &.b-white {
            color: white;
        }

        &.b-full-white {
            color: black;
            background-color: white;
            &:hover {
                color: white;
                background-color: black;
            }
        }

        &.b-info {
            color: white;
            &:hover {
                color: black;
                background-color: rgb(177, 177, 177);
            }
        }

        &.b-full-info {
            color: black;
            background-color: rgb(177, 177, 177);
            &:hover {
                background-color: rgb(177, 177, 177, 0.8);
            }
        }

        &.b-red {
            color: white;
            &:hover {
                color: black;
                background-color: #f22613;
            }
        }

        &.b-full-red {
            color: white;
            background-color: #f22613;
            &:hover {
                background-color: #f22613a9;
            }
        }
    }
</style>