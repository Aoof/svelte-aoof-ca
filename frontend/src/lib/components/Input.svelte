<script lang="ts">
    export let type = 'text';
    export let value = '';

    let inputValue = '';

    $: inputValue = type === 'password' ? '⋅'.repeat(value.length) : value;

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        if (type === 'password') {
            const newInput = target.value;
            const currentDots = '⋅'.repeat(value.length);
            if (newInput.length > currentDots.length) {
                // Adding characters
                const added = newInput.slice(currentDots.length);
                value += added;
            } else if (newInput.length < currentDots.length) {
                // Removing characters
                value = value.slice(0, newInput.length);
            }
            target.value = '⋅'.repeat(value.length);
        } else {
            value = target.value;
        }
    }
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
    <input type={type === 'password' ? 'text' : type} value={inputValue} on:input={handleInput} {...$$restProps} />
{/if}