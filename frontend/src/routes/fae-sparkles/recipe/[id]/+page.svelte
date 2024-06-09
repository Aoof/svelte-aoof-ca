<script lang="ts">
    import { marked } from 'marked';

    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    import { goto } from '$app/navigation';

    import { newRecipe as recipe, getRecipe } from '$lib/../stores/recipes';
    
    import Button from '$lib/components/Button.svelte';
    import Tag from '$lib/components/Tag.svelte';

    let id : string;

    onMount(async () => {
        id = $page.params.id;

        await getRecipe(id);
    });
</script>

<style lang="scss">
    .recipe-wrapper {
        max-width: 700px;
        margin: auto;
        text-align: left;
        padding-top: 70px;

        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: rgba(40, 40, 40);
        border-radius: 10px;

        padding: 2rem;
        margin: 2rem auto;
    }
</style>

    <div class="recipe-wrapper">
        <div class="mb-3 flex justify-between">
            <Button text="<i class='fas fa-x text-white'></i>" on:click={() => goto('/fae-sparkles')} />
            <div>
                <Button text="<i class='fas fa-edit text-white'></i>" on:click={() => goto(`/fae-sparkles/recipe/${id}/edit`)} />
                <Button text="<i class='fas fa-trash text-white'></i>" on:click={() => goto(`/fae-sparkles/recipe/${id}/delete`)} />
            </div>
        </div>
        
        <div class="p-4 *:text-lg">
            <h1 class="!text-3xl mb-6 text-center">{$recipe.title}{#if $recipe.vegetarian}&nbsp;<i class="fas fa-leaf text-green text-2xl"></i>{/if}</h1>
            <p class="font-bold">{$recipe.foodType} - {$recipe.cookTime}</p>
            <ul class="my-2 list-disc">
                {#each $recipe.ingredients as ingredient}
                    <li class="my-2">{ingredient.amount} {ingredient.ingredient}</li>
                {/each}
            </ul>
            <p class="!my-4">{@html marked($recipe.instructions)}</p>
            <p>{#each $recipe.tags as tag, i}
                <Tag text={tag} className="{i == 0 ? '!ml-0' : ''}" />
            {/each}</p>
        </div>
    </div>