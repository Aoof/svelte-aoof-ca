<script lang="ts">
    import { recipes, searchRecipes, fetchRecipes } from '$lib/../stores/recipes';

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import Loader from '$lib/components/Loader.svelte';
    import { addToast } from '$lib/../stores/toasts';
    
    import RecipeCard from './RecipeCard.svelte';
    import Input from './Input.svelte';

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
    let tagsQuery = [];
    let ingredientsQuery = [];

    async function handleSearchEvents(event : KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchRecipes(searchQuery);
        }
    }
</script>

<article>
    <Input type="text" placeholder="Search" className="search" on:input={(event) => handleSearchEvents(event.detail)} bind:value={searchQuery} />
    <div class="recipes-wrapper">
        {#if !$isLoaded}
            <Loader />
        {:else if $recipes.length > 0}
            {#each $recipes as recipe}
                <RecipeCard recipe={recipe} />
            {/each}
        {:else}
            <p>No recipes found</p>
        {/if}
    </div>
</article>