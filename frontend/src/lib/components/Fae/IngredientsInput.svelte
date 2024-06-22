
<script lang="ts">
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import type { Recipe } from '$lib/types';

    import { 
        newRecipe,
        getAllIngredients,
        getAllTags,
        allRecipes as recipes
    } from '$lib/../stores/recipes';

    export let recipe : Writable<Recipe> = newRecipe;
    export let currentIngredient : Writable<{amount: string, ingredient: string}> = writable({amount: '', ingredient: ''});
    export let className : string = '';

    let autofillContent : Writable<{content : string[], show: boolean}> = writable({content : [], show: false});
    let ingredientsInput : HTMLInputElement[] = Array.from({length: $recipe.ingredients.length}, () => document.createElement('input'));
    let ingredientsResultContainers : HTMLDivElement[] = Array.from({length: $recipe.ingredients.length}, () => document.createElement('div'));
    let currentResultsContainer : HTMLDivElement = document.createElement('div');
    let currentIngredientInput : HTMLInputElement = document.createElement('input');

    // Peanut butter is the active ingredient 🥜
    $: peanutButter = (document.activeElement == currentIngredientInput) ? currentIngredientInput : ingredientsInput.find(input => document.activeElement == input) || currentIngredientInput;

    $: if ($currentIngredient.ingredient) {
        updateAutofill();
    } else {
        removeResults();
    }

    function updateAutofill() {
    }

    function removeResults() {
        $autofillContent.show = false;
        $autofillContent.content = [];

        ingredientsResultContainers.forEach(container => {
            container.classList.remove('show');
        });

        currentResultsContainer.classList.remove('show');
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
            $currentIngredient = currentRecipe.ingredients[currentRecipe.ingredients.length - 1]
            currentRecipe.ingredients.pop();
            return currentRecipe;
        });
    }

    function handleAddIngredient() {
        if (!$currentIngredient.ingredient) {
            return;
        }

        recipe.update(currentRecipe => {
            currentRecipe.ingredients.push($currentIngredient);
            return currentRecipe;
        });
        $currentIngredient = {
            amount: '',
            ingredient: ''
        };
    }

    function handleIngredientKeydown(event : KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddIngredient();
        }
        if (event.key === 'Backspace' && $currentIngredient.ingredient === '' && $currentIngredient.amount === '') {
            event.preventDefault();
            removeIngredient();
        }
    }
    
    
</script>

<style lang="scss">
  .svelte-input,
  .input-container {
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
    white-space: pre-line;
  }

  .input-container {
    position: relative;
    cursor: text;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;

    .results-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: none;
      background-color: rgba(40, 40, 40);
      border-radius: 0.25rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;

      .results-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 200px;
        overflow-y: auto;
      }

      .result-item {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(30, 30, 30);
        }

        &.highlighted {
          background-color: rgba(30, 30, 30);
        }

        .result-button {
          padding: 0.5rem 1rem;
          width: stretch;
          background-color: transparent;
          border: none;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            filter: brightness(0.9);
          }
        }
      }

      &.show {
        display: block;
      }
    }

    input {
      border: none;
      border-radius: 0.25rem;
      background-color: rgba(40, 40, 40);
      color: #fff;
      font-size: 1rem;

      min-width: 200px;
      &:focus {
        outline: none;
      }
    }
  }



</style>

<div class={className}>
    {#each $recipe.ingredients as ingredient, i}
        <input type="text" class="col-span-3 !my-1 svelte-input" bind:value={ingredient.amount} />
        <button
            class={"input-container col-span-8 !my-1"}
            on:click={() => ingredientsInput[i].focus()}
            on:focus={() => ingredientsInput[i].focus()}
        >
            <input
                type="text"
                class="svelte-input"
                bind:this={ingredientsInput[i]}
                bind:value={ingredient.ingredient}
                {...$$restProps}
            />
            <div class="results-container" bind:this={ingredientsResultContainers[i]}>
            <ul class="results-list">
                {#each $autofillContent.content as item, i}
                <li class={"result-item"}>
                    <button 
                    class={`result-button`}
                    >{@html item}</button>
                </li>
                {/each}
            </ul>
            </div>
        </button>
    
        <button class="col-span-1 h-fit" on:click={() => removeIngredient(ingredient.ingredient)}>-</button>
    {/each}
    <input type="text" class="col-span-3 !my-1 svelte-input" bind:value={$currentIngredient.amount} on:keydown={handleIngredientKeydown} />
    <button
        class={"input-container col-span-9 !my-1"}
        on:click={() => currentIngredientInput.focus()}
        on:focus={() => currentIngredientInput.focus()}
    >
        <input
            type="text"
            bind:this={currentIngredientInput}
            bind:value={$currentIngredient.ingredient}
            {...$$restProps}
        />
        <div class="results-container" bind:this={currentResultsContainer}>
        <ul class="results-list">
            {#each $autofillContent.content as item, i}
            <li class={"result-item"}>
                <button 
                class={`result-button`}
                >{@html item}</button>
            </li>
            {/each}
        </ul>
        </div>
    </button>
    
    <button class="col-span-12" style='background-color: #E0AFA0;' on:click={handleAddIngredient}>+</button>
</div>