<script lang="ts">
    import { parse } from 'marked';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import { newRecipe as recipe, getRecipe, deleteRecipe } from '$lib/../stores/recipes';
    import { addToast } from '$lib/../stores/toasts';
    import { confirmDialog } from '$lib/../stores/dialog';
    
    import Loader from '$lib/components/Fae/Loader.svelte';
    import Button from '$lib/components/Fae/Button.svelte';
    import Tag from '$lib/components/Fae/Tag.svelte';

    export let id : string;

    let isLoaded = false;

    let dialogConfirmed = false;
    $ : {
        if (dialogConfirmed) {
            deleteRecipe($recipe._id).then(res => {
                if (res.ok) {
                    addToast({
                        message: 'Recipe deleted',
                        type: 'success',
                        dismissible: true,
                        timeout: 3000
                    });
                    goto('/fae-sparkles');
                } else {
                    addToast({
                        message: 'Failed to delete recipe',
                        type: 'error',
                        dismissible: true,
                        timeout: 3000
                    });
                }
            }).catch(e => {
                addToast({
                    message: 'Failed to delete recipe',
                    type: 'error',
                    dismissible: true,
                    timeout: 3000
                });
            });
        }
    }

    async function handleDelete() {
        confirmDialog('Delete Recipe', 'Are you sure you want to delete this recipe?', () => { dialogConfirmed = true; });
    }

    onMount(async () => {
        await getRecipe(id);
        isLoaded = true;
    });

    function getDateString(date: Date | string) {
        return new Date(date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    }
</script>

<style lang="scss">
    .recipe-wrapper {
        width: 700px;
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
                <Button className='b-info' text="<i class='fas fa-edit'></i>" on:click={() => goto(`/fae-sparkles/recipe/${id}/edit`)} />
                <Button className='b-red' text="<i class='fas fa-trash'></i>" on:click={handleDelete} />
            </div>
        </div>
        
        <div class="p-4 *:text-lg">
            {#if !isLoaded}
                <Loader />
            {:else}
                <h1 class="!text-3xl mb-6 text-center">{$recipe.title}{#if $recipe.vegetarian}&nbsp;<i class="fas fa-leaf text-green text-2xl"></i>{/if}</h1>
                <p class="font-bold">{$recipe.foodType} - {$recipe.cookTime}</p>
                <ul class="my-2 list-disc">
                    {#each $recipe.ingredients as ingredient}
                        <li class="my-2">{ingredient.amount} {ingredient.ingredient}</li>
                    {/each}
                </ul>
                <p class="!my-4">{@html parse($recipe.instructions.replaceAll('\n', '<br>'))}</p>
                <p>{#each $recipe.tags as tag, i}
                    <Tag text={tag} className="{i == 0 ? '!ml-0' : ''}" />
                {/each}</p>
            {/if}
        </div>

        <div>
            <p class="text-sm text-right">{getDateString($recipe.createdDate)}</p>
        </div>
    </div>