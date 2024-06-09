<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    import RecipeForm from '$lib/components/RecipeForm.svelte';
    
    import { newRecipe as recipe, getRecipe } from '$lib/../stores/recipes';

    let isLoaded = false;
    let id = $page.params.id;
    
    onMount(async () => {
        await getRecipe(id);
        isLoaded = true;
    });
</script>

<style lang="scss">

</style>

<RecipeForm recipe={recipe} />
