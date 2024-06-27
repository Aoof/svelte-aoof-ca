<script lang="ts">
    import { writable } from "svelte/store";
    import { searchRecipes, allRecipes } from "$lib/../stores/recipes";
    import { addSearchTag, searchTags as tags } from "$lib/../stores/tags";

    import Input from "./Input.svelte";

    export let onsearch = () => {};

    export let searchQuery = writable('');

    let search = '';
    let oldSearchQuery = '';

    function keydownHandler(event : CustomEvent<KeyboardEvent>) {
        search = $searchQuery;

        if (event.detail.key.length === 1) search += event.detail.key;
        if (event.detail.key === 'Backspace') search = search.slice(0, -1);

        if (oldSearchQuery !== search) {
            oldSearchQuery = search;
            let searchQueries = [...$tags, ...search.split('+')];
            searchRecipes($allRecipes, searchQueries.join('+'));
            onsearch();
        }
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
    on:keydown={keydownHandler}
    on:autofill={ evnt => addSearchTag(evnt.detail.value) } />
