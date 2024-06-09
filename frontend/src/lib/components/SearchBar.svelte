<script lang="ts">
    import { writable } from "svelte/store";
    import { searchRecipes } from "$lib/../stores/recipes";
    import { tags } from "$lib/../stores/tags";

    import Input from "./Input.svelte";

    export let searchQuery = writable('');

    $ : {
        let searchQueries = [...$tags, ...$searchQuery.split('+')];
        searchRecipes(searchQueries.join('+'));
    };
</script>

<style>
</style>

<Input 
    type="text" 
    placeholder="Search" 
    className="search" 
    bind:value={$searchQuery} 
    autofill={true}
    isTags={true}
    tags={$tags} />
