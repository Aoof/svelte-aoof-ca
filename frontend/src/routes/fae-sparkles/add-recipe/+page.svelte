<script>
    // User is logged in this is the page that will be displayed
    import { addToast } from '$lib/../stores/toasts';
    import { newRecipe as recipe, addRecipe, getRecipes } from '$lib/../stores/recipes';
    import { navigate } from 'svelte-routing';
    import { onMount } from 'svelte';

    import Button from '$lib/../components/Button.svelte';

    function handleSubmission() {
        addRecipe();
        addToast({
            message: "Recipe added",
            type: "success",
            dismissible: true
        });

        console.log(getRecipes());
    }

    onMount(() => {
        recipe.set({
            _id: '',
            title: '',
            cookTime: 'Under 10 minutes',
            foodType: 'Appetizer',
            ingredients: [],
            instructions: '',
            tags: [],
            vegetarian: false
        });
    });

    /**
     * Handle keystrokes for adding ingredients
     * @param {KeyboardEvent} event
     */
    function handleKeystrokes(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddIngredient();
        }
        if (event.key === 'Backspace' && currentIngredient.ingredient === '') {
            event.preventDefault();
            removeIngredient();
        }
    }

    /**
     * Remove the last ingredient from the recipe
     * @param {string} ingredient
     */
    function removeIngredient(ingredient = '') {
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

        .mb-4 {
            .input-label {
                user-select: none;
                width: stretch;
                font-size: 1.2em;
                line-height: 1.5em;
                padding-bottom: 2rem;
            }

            input, select, textarea {    
                width: 100%;
                padding: 0.75rem 1.5rem;
                font-weight: 400;
                line-height: 1.5;
                color: #fff;
                background-color: rgba(138, 129, 124, 0.3450980392);
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
                font-size: 1.5rem;
            }
        }
    }
</style>

<form on:submit|preventDefault>
    <div class="mb-4">
        <label class="input-label" for="title">Title</label>
        <input type="text" name="title" id="title" bind:value={$recipe.title}>
    </div>
    <div class="mb-4">
        <label class="input-label" for="cookTime">Cook Time</label>
        <select name="cookTime" id="cookTime" bind:value={$recipe.cookTime}>
            <option value="Under 10 minutes">Under 10 minutes</option>
            <option value="10-30 minutes">10-30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="Over an hour">Over an hour</option>
        </select>
    </div>
    <div class="mb-4">
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
    <div class="mb-4">
        <label class="input-label" for="">Ingredients</label>
        <div>
            <div class="grid grid-cols-12 gap-2">
                <div class="col-span-3 text-sm">Amount</div>
                <div class="col-span-9 text-sm">Name</div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
            {#each $recipe.ingredients as ingredient, i}
                <input type="text" class="col-span-3" bind:value={ingredient.amount}>
                <div class="col-span-8">
                    <input type="text" bind:value={ingredient.ingredient}>
                    <div id="results-container-1">
                        <ul class="results-list"></ul>
                    </div>
                </div>
                <Button text="-" callback={() => removeIngredient(ingredient.ingredient)} className="col-span-1" />
            {/each}
            <input type="text" class="col-span-3" bind:value={currentIngredient.amount} on:keydown={handleKeystrokes}>
            <div class="col-span-9">
                <input type="text" bind:value={currentIngredient.ingredient} on:keydown={handleKeystrokes}>
                <div id="results-container-1">
                    <ul class="results-list"></ul>
                </div>
            </div>
            <Button text="+" callback={handleAddIngredient} className="col-span-12" />
        </div>
    </div>
    <div class="mb-4">
        <label class="input-label" for="instructions">Instructions</label>
        <textarea name="instructions" id="instructions" ></textarea>
    </div>
    <div class="mb-4">
        <label class="input-label" for="tags">Tags</label>
        <div>
            <div>
                <input type="text" id="tags">
                <div id="results-container-2">
                    <ul class="results-list"></ul>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-4">
        <label for="vegetarian">Vegetarian?</label>
        <input type="checkbox" name="vegetarian" id="vegetarian">
    </div>
    
    <div class="mb-4">
        <input type="hidden" name="_csrf" id="_csrf" value="<%= csrfToken %>">
        <Button text="Cancel" callback={() => window.location.href = '/fae-sparkles'} />
        <Button text="Add" callback={handleSubmission} />
    </div>
</form>
