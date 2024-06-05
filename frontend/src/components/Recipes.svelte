<script lang="ts">
    import { recipes, searchRecipes, fetchRecipes } from '$lib/../stores/recipes';

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import Loader from '$lib/../components/Loader.svelte';
    import { addToast } from '$lib/../stores/toasts';

    const isLoaded = writable(false);

    onMount(async () => {
        let result = await fetchRecipes();
        if (!result) {
            addToast({
                message: 'Failed to fetch recipes',
                type: 'error',
                dismissible: true
            });
            return;
        } else {
            isLoaded.set(true);
        }
    });

    const page = writable(1);
    const pages = writable(1);
    const limit = writable(10);

    let searchQuery = '';

    async function handleSearchEvents(event : KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchRecipes(searchQuery);
        }
    }
</script>

<style>
    input.search {
        width: 100%;
        padding: 0.75rem 1.5rem;
        margin: 1rem 0;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        background-color: rgba(138, 129, 124, 0.3450980392);
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        font-size: 1rem;
    }
</style>

<article>
    <input type="text" placeholder="Search" class="search" on:keydown={handleSearchEvents} bind:value={searchQuery} />
    <div class="recipes-wrapper">
        {#if !$isLoaded}
            <Loader />
        {:else if $recipes.length > 0}
            {#each $recipes as recipe}
                <div class="recipe-card">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                </div>
            {/each}
        {:else}
            <p>No recipes found</p>
        {/if}
    </div>
</article>