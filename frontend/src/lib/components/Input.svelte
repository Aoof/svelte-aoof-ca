<script lang="ts">
    export let type = 'text';
    export let value = '';
</script>

<style lang="scss">
    input,
    textarea {
        width: 100%;
        padding: 0.75rem 1.5rem;
        margin: 1rem 0;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        background-color: rgba(40, 40, 40);
        background-clip: padding-box;
        border-radius: 0.25rem;
        font-size: 1rem;
        border: 1px solid gray;
        white-space: pre-line;
    }

    textarea {
        resize: vertical;
        min-height: 150px;
    }
</style>

{#if type === 'textarea'}
    <textarea {...$$restProps} bind:value={value} />
{:else}
    <input type="text" {...$$restProps} bind:value={value} />
{/if}