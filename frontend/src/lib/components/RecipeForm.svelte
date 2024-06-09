<script lang="ts">
    // User is logged in this is the page that will be displayed
    import { writable } from 'svelte/store';
    import { addToast } from '$lib/../stores/toasts';
    import { onMount } from 'svelte';

    import { newRecipe, addRecipe, updateRecipe } from '$lib/../stores/recipes';
    import { 
        recipeTags as tags, 
        addRecipeTag as addTag, 
        removeRecipeTag as removeTag, 
        clearRecipeTags as clearTags

    } from '$lib/../stores/tags';

    import Button from '$lib/components/Button.svelte';
    import Input from '$lib/components/Input.svelte';
    
    import { goto } from '$app/navigation';

    export let recipe = newRecipe;

    onMount(() => {
        clearTags();

        $recipe.tags.forEach(tag => {
            addTag(tag);
        });
    });

    async function handleAddRecipe() {
        addRecipe().then(() => {
            addToast({
                message: "Recipe added",
                type: "success",
                dismissible: true
            });
            goto('/fae-sparkles');
        }).catch(e => {
            addToast({
                message: "Failed to add recipe",
                type: "error",
                dismissible: true
            });
        });
    }

    async function handleUpdateRecipe() {
        updateRecipe().then(() => {
            addToast({
                message: "Recipe updated",
                type: "success",
                dismissible: true
            });
            goto('/fae-sparkles');
        }).catch(e => {
            addToast({
                message: "Failed to update recipe",
                type: "error",
                dismissible: true
            });
        });
    }

    async function handleSubmission() {
        if ($recipe._id !== '') {
            await handleUpdateRecipe();
        } else {
            await handleAddRecipe();
        }
    }

    let recipeTags = writable('');

    function handleTagKeydown(event : CustomEvent<KeyboardEvent>) {
        if (event.detail.key === 'Backspace' && $recipeTags === '' && $tags.length > 0) {
            removeTag($tags[$tags.length - 1]);
        }
        
        if (event.detail.key === 'Enter' || event.detail.key === 'Tab' || event.detail.key === '+' || event.detail.key === ' ') {
            if (event.detail.key === '+') {
                event.detail.preventDefault();
            }
            if ($recipeTags !== '' && $tags.indexOf($recipeTags.trim()) === -1) {
                addTag($recipeTags.trim());
            }
            $recipeTags = '';
        }
    }

    function handleIngredientKeydown(event : CustomEvent<KeyboardEvent>) {
        if (event.detail.key === 'Enter') {
            event.detail.preventDefault();
            handleAddIngredient();
        }
        if (event.detail.key === 'Backspace' && currentIngredient.ingredient === '' && currentIngredient.amount === '') {
            event.detail.preventDefault();
            removeIngredient();
        }
    }
    
    function removeIngredient(ingredient : string = '') {
        recipe.update(currentRecipe => {
            if (currentRecipe.ingredients.length === 0) {
                return currentRecipe;
            }
            if (ingredient) {
                currentRecipe.ingredients = currentRecipe.ingredients.filter(i => i.ingredient !== ingredient);
                return currentRecipe;
            }
            currentIngredient = currentRecipe.ingredients[currentRecipe.ingredients.length - 1]
            currentRecipe.ingredients.pop();
            return currentRecipe;
        });
    }

    function handleAddIngredient() {
        if (!currentIngredient.ingredient) {
            return;
        }

        recipe.update(currentRecipe => {
            currentRecipe.ingredients.push(currentIngredient);
            return currentRecipe;
        });
        currentIngredient = {
            amount: '',
            ingredient: ''
        };
    }

    let currentIngredient = {
        amount: '',
        ingredient: ''
    };
</script>

<style lang="scss">
    form {
        max-width: 700px;
        margin: auto;
        text-align: left;
        padding-top: 70px;

        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: rgba(40, 40, 40);
        border-radius: 10px;

        padding: 3rem 2rem;
        margin: 2rem auto;

        select {
            width: 100%;
            padding: 0.75rem 1.5rem;
            margin: 1rem 0;
            font-weight: 400;
            line-height: 1.5;
            color: #fff;
            background-color: rgba(40, 40, 40);
            background-clip: padding-box;
            border-radius: 0.25rem;
            font-size: 1rem;
            border: 1px solid gray;
        }

        .input-label {
            user-select: none;
            width: stretch;
            font-size: 1.2em;
            line-height: 1.5em;
        }
    }
</style>

<form on:submit|preventDefault>
    <div class="text-right">
        <Button text="<i class='fas fa-x text-white'></i>" on:click={() => goto('/fae-sparkles')} />
    </div>
    <div class='pt-2 pb-1'>
        <label class="input-label" for="title">Title</label>
        <Input type="text" name="title" id="title" bind:value={$recipe.title} />
    </div>
    <div class='pt-2 pb-1'>
        <label class="input-label" for="cookTime">Cook Time</label>
        <select name="cookTime" id="cookTime" bind:value={$recipe.cookTime}>
            <option value="Under 10 minutes">Under 10 minutes</option>
            <option value="10-30 minutes">10-30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="Over an hour">Over an hour</option>
        </select>
    </div>
    <div class='pt-2 pb-1'>
        <label class="input-label" for="foodType">Food Type</label>
        <select name="foodType" id="foodType" bind:value={$recipe.foodType}>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Side Dish">Side Dish</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Drink">Drink</option>
        </select>
    </div>
    <div class='pt-2 pb-1'>
        <label class="input-label" for="">Ingredients</label>
        <div>
            <div class="grid grid-cols-12 gap-2 mt-3">
                <div class="col-span-3 text-sm">Amount</div>
                <div class="col-span-9 text-sm">Name</div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-2 ingredients-container justify-center items-center">
            {#each $recipe.ingredients as ingredient, i}
                <Input type="text" className="col-span-3 !my-1" bind:value={ingredient.amount} />
                <Input type="text" className="col-span-8 !my-1" bind:value={ingredient.ingredient} autofill={true} />

                <Button text="-" className="col-span-1 h-fit" on:click={() => removeIngredient(ingredient.ingredient)} />
            {/each}
            <Input type="text" className="col-span-3" bind:value={currentIngredient.amount} on:keydown={handleIngredientKeydown} />
            <Input type="text" className="col-span-9" bind:value={currentIngredient.ingredient} on:keydown={handleIngredientKeydown} autofill={true} />

            <Button text="+" className="col-span-12" style='background-color: #E0AFA0;' on:click={handleAddIngredient} />
        </div>
    </div>
    <div class='pt-4 pb-1'>
        <label class="input-label" for="instructions">Instructions</label>
        <Input 
            type="textarea" 
            name="instructions" 
            id="instructions" 
            bind:value={$recipe.instructions} />
    </div>
    <div class='pt-2 pb-1'>
        <label class="input-label" for="tags">Tags</label>
        <Input 
            type="text" 
            id="tags" 
            autofill={true} 
            isTags={true} 
            override={true} 
            bind:tags={$tags} 
            bind:value={$recipeTags} 
            on:keydown={handleTagKeydown} />
    </div>

    <div>
        <label for="vegetarian">Vegetarian?</label>
        <Input type="checkbox" name="vegetarian" id="vegetarian" bind:value={$recipe.vegetarian} />
    </div>
    
    <div class="text-right">
        <Button text="Cancel" on:click={() => {
            clearTags();
            goto('/fae-sparkles');
        }} />
        <Button text="Add" on:click={handleSubmission} style='background-color: #E0AFA0' />
    </div>
</form>
