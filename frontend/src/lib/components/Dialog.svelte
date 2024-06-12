<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { dialog, closeDialog } from "$lib/../stores/dialog";

    import Button from "$lib/components/Button.svelte";
</script>

{#if $dialog.open}
<section>
    <div class="w-fit h-fit p-12 dialog-container">
        <h1 class="text-center my-5">{$dialog.title}</h1>
        <p class="my-5">{$dialog.content}</p>
        <div class="flex flex-row justify-between align-middle items-center my-5 w-full">
            {#each $dialog.buttons as button}
                <Button text={button.text} className={button.class} on:click={() => {button.action(); closeDialog();}} />
            {/each}
        </div>
    </div>
</section>
{/if}

<style lang="scss">
    section {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        .dialog-container {
            border-radius: 10px;
            background-color: rgba(40, 40, 40);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        z-index: 1000;
    }
</style>