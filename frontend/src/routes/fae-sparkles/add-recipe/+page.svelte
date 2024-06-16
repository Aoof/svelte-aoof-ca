<script lang="ts">
    import RecipeForm from '$lib/components/Fae/RecipeForm.svelte';

    import { newRecipe } from '$lib/../stores/recipes';

    import { onMount } from 'svelte';
    import { clearRecipeTags } from '$lib/../stores/tags';

    onMount(() => {
        if ($newRecipe._id !== '') {
            clearRecipeTags();

            newRecipe.set({
                _id: "",
                title: "",
                instructions: "",
                cookTime: "30-60 minutes",
                foodType: "Appetizer",
                tags: [],
                vegetarian: true,
                ingredients: [],
                createdDate: new Date(),
            })
        }
    });
</script>


<RecipeForm />