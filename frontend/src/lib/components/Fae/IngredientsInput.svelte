
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

    let autofillContent : Writable<{content : string[], show: boolean}> = writable({content: [], show: false});

    let activeIndex = -1;

    let search = '';
    let oldSearch = '';

    let inputs : HTMLInputElement[] = [document.createElement('input')];
    let results : HTMLDivElement[] = [document.createElement('div')];

    function addIngredient() {        
        if ($currentIngredient.ingredient === '') return;
        if ($currentIngredient.amount === '') $currentIngredient.amount = 'amount';
        $recipe.ingredients = [...$recipe.ingredients, $currentIngredient];

        $currentIngredient = {amount: '', ingredient: ''};
    }

    function removeIngredient(index: number) {
        results = results.filter((_, i) => i !== index + 1);
        inputs = inputs.filter((_, i) => i !== index + 1);

        $recipe.ingredients = $recipe.ingredients.filter((_, i) => i !== index);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (activeIndex === 0) search = $currentIngredient.ingredient;
        else search = $recipe.ingredients[activeIndex-1].ingredient;

        if (event.key === 'Backspace' && search === '') {
            event.preventDefault();
            if (activeIndex -1 === 0) return;
            if (activeIndex === 0) 
            {
                if ($recipe.ingredients.length === 0) return;
                $currentIngredient = $recipe.ingredients[$recipe.ingredients.length - 1];
                removeIngredient($recipe.ingredients.length - 1);
            } else removeIngredient(activeIndex - 1);
            return;
        }
        
        if (event.key.length === 1) search += event.key;
        if (event.key === 'Backspace') search = search.slice(0, -1);

        if (event.key === 'Escape') {
            removeResults();
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if ($autofillContent.content.length === 0) return;
            let highlighted = results[activeIndex].querySelector('.highlighted');
            let resultsList = results[activeIndex].querySelector('.results-list') as Element;
            if (highlighted) {
                let index = Array.from(resultsList.children).indexOf(highlighted);
                if (event.key === 'ArrowDown') {
                    index = (index + 1) % resultsList.children.length;
                } else {
                    index = (index - 1 + resultsList.children.length) % resultsList.children.length;
                }
                highlighted.classList.remove('highlighted');
                resultsList.children[index].classList.add('highlighted');
            } else {
                resultsList.children[0].classList.add('highlighted');
            }
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if ($autofillContent.content.length === 0) {
                removeResults();
                addIngredient();
            } else {
                let highlighted = results[activeIndex].querySelector('.highlighted');
                if (highlighted) {
                    let index = Array.from((results[activeIndex].querySelector('.results-list') as Element).children).indexOf(highlighted);
                    selectResult(index);
                }
            }
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            if ($autofillContent.content.length === 0) {
                removeResults();
                addIngredient();
            } else {
                let highlighted = results[activeIndex].querySelector('.highlighted');
                if (highlighted) {
                    let index = Array.from((results[activeIndex].querySelector('.results-list') as Element).children).indexOf(highlighted);
                    selectResult(index);
                }
            }
        }
        
        if (oldSearch !== search) updateAutofill();
    }

    function updateAutofill() {
        oldSearch = search;

        let content = getAllIngredients($recipes, search);

        if (content.length === 1 && content[0].toLowerCase() === search.toLowerCase()) {
            removeResults();
            return;
        }

        if (content.length === 0 || search === '') {
            removeResults();
        } else {
            content = content.map(item => makeMatchBold(item));
            $autofillContent.content = content;
            showResults();
        }

        removeHighlighted();
    }

    function selectResult(index: number) {
        let result = $autofillContent.content[index];
        setInputValue(result);
        removeResults();
    }

    function removeResults()  {
        results.forEach(result => {
            if (result) result.classList.remove('show');
        });
        $autofillContent = {content: [], show: false};
    }
    
    function showResults() {
        results[activeIndex].classList.add('show');
        $autofillContent.show = true;
    }

    function makeMatchBold(str: string) {
        return str.replace(new RegExp(search, "gi"), (match) => `<span style="font-weight: 700;">${match}</span>`);
    };

    function removeBold(str: string) {
        return str.replace(new RegExp('<span style="font-weight: 700;">|</span>', "gi"), "");
    };

    function setInputValue(value: string) {
        value = removeBold(value);
        inputs[activeIndex].value = value;
        search = value;
        if (activeIndex === 0) {
            $currentIngredient.ingredient = value;
        } else {
            $recipe.ingredients[activeIndex-1].ingredient = value;
        }
        removeResults();
    }

    function removeHighlighted() {
        let highlighted = results[activeIndex]?.querySelector('.highlighted');
        if (highlighted) {
            highlighted.classList.remove('highlighted');
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
        <button class={"input-container col-span-8 !my-1"} 
            on:click={() => inputs[i+1].focus()}>
            <input
                type="text"
                bind:value={ingredient.ingredient}
                on:focus={() => activeIndex = i+1}
                bind:this={inputs[i+1]}
                on:keydown={handleKeydown}
                {...$$restProps}
            />
            <div class="results-container" bind:this={results[i+1]}>
            <ul class="results-list">
                {#each $autofillContent.content as item, j}
                <li class={"result-item"}>
                    <button class={`result-button`} on:click={() => selectResult(j)}>{@html item}</button>
                </li>
                {/each}
            </ul>
            </div>
        </button>
    
        <button class="col-span-1 h-fit" on:click={() => removeIngredient(i)}>-</button>
    {/each}
    <input type="text" class="col-span-3 !my-1 svelte-input" bind:value={$currentIngredient.amount} />
    <button class={"input-container col-span-9 !my-1"} 
        on:click={() => inputs[0].focus()}>
        <input 
            type="text" 
            bind:this={inputs[0]} 
            bind:value={$currentIngredient.ingredient} 
            on:focus={() => activeIndex = 0}
            on:keydown={handleKeydown} 
            {...$$restProps} />
        <div class="results-container" bind:this={results[0]}>
        <ul class="results-list">
            {#each $autofillContent.content as item, i}
            <li class={"result-item"}>
                <button class={`result-button`} on:click={() => selectResult(i)}>{@html item}</button>
            </li>
            {/each}
        </ul>
        </div>
    </button>
    
    <button class="col-span-12" style='background-color: #E0AFA0;' on:click={addIngredient}>+</button>
</div>