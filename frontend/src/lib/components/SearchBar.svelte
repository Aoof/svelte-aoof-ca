<script lang="ts">
    import { writable } from "svelte/store";
    import { searchRecipes } from "$lib/../stores/recipes";

    import Input from "./Input.svelte";

    export let searchQuery = writable('');

    $ : searchRecipes($searchQuery);
</script>

<style>
</style>

<Input type="text" placeholder="Search" className="search" bind:value={$searchQuery} />
