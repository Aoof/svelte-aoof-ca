<script>
    export let callback;
    export let text;

    export let className = '';
</script>

<style>
</style>

<!-- Tailwind btn -->
<button class={`py-2 px-5 text-black rounded bg-pink hover:bg-opacity-70 transition-all duration-200 w-100 ` + className} on:click|preventDefault={callback}>
    {text}
</button>