<script lang="ts">
    import { writable } from "svelte/store";
    import { searchRecipes, allRecipes } from "$lib/../stores/recipes";
    import { addSearchTag, searchTags as tags } from "$lib/../stores/tags";

    import Input from "./Input.svelte";

    export let searchQuery = writable('');

    $ : {
        let searchQueries = [...$tags, ...$searchQuery.split('+')];
        searchRecipes($allRecipes, searchQueries.join('+'));
    }
</script>

<Input 
    type="text" 
    placeholder="Search" 
    className="search" 
    bind:value={$searchQuery} 
    autofill={true}
    isTags={true}
    searchBar={true}
    tags={$tags}
    on:autofill={ evnt => addSearchTag(evnt.detail.value) } />
