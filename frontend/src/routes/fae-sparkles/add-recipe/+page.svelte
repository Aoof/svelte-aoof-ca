<script lang="ts">
    import RecipeForm from '$lib/components/RecipeForm.svelte';

    import { newRecipe } from '$lib/../stores/recipes';

    import { onMount } from 'svelte';

    onMount(() => {
        if ($newRecipe._id !== '') {
            newRecipe.set({
                _id: "",
                title: "",
                instructions: "",
                cookTime: "",
                foodType: "",
                tags: [],
                vegetarian: false,
                ingredients: [],
                createdDate: new Date().toISOString(),
            })
        }
    });
</script>


<RecipeForm />