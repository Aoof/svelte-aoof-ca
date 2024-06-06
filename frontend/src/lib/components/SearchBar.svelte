<script lang="ts">
    import { writable } from "svelte/store";
    import { recipes, searchRecipes } from "$lib/../stores/recipes";

    import Input from "./Input.svelte";

    export let searchQuery = writable('');
    let oldSearchQuery = '';

    function handleSearchEvents() {
        if ($searchQuery === oldSearchQuery) return;
        oldSearchQuery = $searchQuery;
        searchRecipes($searchQuery);
    }
</script>

<style>
</style>

<Input type="text" placeholder="Search" className="search" on:keydown={handleSearchEvents} bind:value={$searchQuery} />
