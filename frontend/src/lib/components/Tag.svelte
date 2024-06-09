<script lang="ts">
    import { goto } from "$app/navigation";

    import { addTag, tags } from "$lib/../stores/tags";

    export let text;
    export let className = '';

    export let override = false;
    export let owonclick : (event : MouseEvent) => void = () => {};

    const handleClick = (event : MouseEvent) => {
        if (override) {
            owonclick(event);
            return;
        }
        event.preventDefault();
        if ($tags.includes(text)) {
            goto('/fae-sparkles');
            return;
        }
        addTag(text);
        goto('/fae-sparkles');
    };
</script>

<style lang="scss">
    .tag {
        color: #000;
        padding: 0.25rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 600;
        background-color: #E0AFA0;
        transition: background-color 0.3s;
        cursor: pointer;
        text-wrap: nowrap;
        &:hover {
          background-color: #e0afa0d3;
        }

        @media (max-width: 768px) {
            font-size: 0.75rem;
        }
    }
</style>

<span class="tag select-none {className}" on:click={handleClick} role="button" tabindex="0" {...$$restProps}>{text}</span>