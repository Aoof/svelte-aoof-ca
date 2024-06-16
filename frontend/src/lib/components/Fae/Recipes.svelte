<script lang="ts">
    import { recipes, fetchRecipes } from '$lib/../stores/recipes';
    import { RECIPES_LIMIT } from '$lib/constants';

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import Loader from '$lib/components/Fae/Loader.svelte';
    import { addToast } from '$lib/../stores/toasts';
    
    import RecipeCard from './RecipeCard.svelte';
    import Input from './Input.svelte';
    import Button from './Button.svelte';
    import SearchBar from './SearchBar.svelte';

    const page = writable(1);
    const pages = writable(3);
    const limit = RECIPES_LIMIT;

    const isLoaded = writable(false);

    onMount(async () => {
        let result = await fetchRecipes();
        if (!result) {
            addToast({
                message: 'Failed to fetch recipes',
                type: 'error',
                dismissible: true,
                timeout: 3000
            });
            return;
        } else {
            isLoaded.set(true);
            recipes.subscribe(r => {
                pages.set(Math.ceil(r.length / limit));
            });
        }
    });
</script>

<style lang="scss">
    .recipes-wrapper {
        min-height: 60vh;
    }
</style>

<article>
    {#if $pages > 1}
        <div class="pagination text-center mt-4">
            <Button on:click={() => $page - 1 > 0 ? page.update(n => n - 1) : null} text="&lt;" />
            <Button text={`${$page} / ${$pages}`} />
            <Button on:click={() => $page + 1 <= $pages ? page.update(n => n + 1) : null} text="&gt;" />
        </div>
    {/if}
    <SearchBar />
    <div class="recipes-wrapper">
        {#if !$isLoaded}
            <Loader />
        {:else if $recipes.length > 0}
            {#each $recipes.slice(($page - 1) * limit, $page * limit) as recipe, i}
                <RecipeCard recipe={recipe} />
            {/each}
            {#if $pages > 1}
                <div class="pagination text-center">
                    <Button on:click={() => $page - 1 > 0 ? page.update(n => n - 1) : null} text="&lt;" />
                    <Button text={`${$page} / ${$pages}`} />
                    <Button on:click={() => $page + 1 <= $pages ? page.update(n => n + 1) : null} text="&gt;" />
                </div>
            {/if}
        {:else}
            <p class="text-center">No recipes found</p>
        {/if}
    </div>
</article>