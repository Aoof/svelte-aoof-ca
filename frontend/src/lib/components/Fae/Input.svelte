<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";

  import Tag from "./Tag.svelte";

  import { 
    removeSearchTag, 
    addSearchTag, 
    searchTags,
    recipeTags,
    addRecipeTag,
    removeRecipeTag,
  } from "$lib/../stores/tags";

  import { getAllIngredients, getAllTags, allRecipes as recipes } from "$lib/../stores/recipes";

  export let className: string = "";
  export let placeholder: string = "";
  export let type: string = "text";
  export let value: string = "";
  export let isChecked : boolean = false;

  $: if (value) {
    updateAutofill();
  } else {
    removeResults();
  }

  export let searchBar : boolean = false;

  export let autofill: boolean = false;
  export const autofillContent = writable({content : <string[]>[], show: <boolean>false});

  const dispatch = createEventDispatcher();

  let tags = searchTags;
  let addTag = addSearchTag;
  let removeTag = removeSearchTag;

  onMount(() => {
    if (searchBar) {
      $tags = [];
    } else {
      tags = recipeTags;
      addTag = addRecipeTag;
      removeTag = removeRecipeTag;
    }
  })

  const removeResults = () => {
    $autofillContent.show = false;
    resultsContainer && resultsContainer.classList.remove("show");
  };

  function autofillHandler(val: string) {
    _this.focus();
    value = removeBold(val);
    removeResults();
    dispatch("autofill", { value });
  }

  $: if ($autofillContent.show) {
    if (resultsContainer) resultsContainer.classList.add("show");
  } else {
    if (resultsContainer) resultsContainer.classList.remove("show");
  }
  
  export let isTags: boolean = false;

  function updateAutofill() {
    let content;

    if (isTags) {
      content = getAllTags($recipes, value);
    } else {
      content = getAllIngredients($recipes, value);
    }

    if (content.length === 0 || value === "" || (value === content[0] && content.length === 1)) {
      removeResults();
    } else {
      content = content.map((item) => makeMatchBold(item, value));
      $autofillContent.content = content;
      $autofillContent.show = true;
    }

    return value;
  }

  const makeMatchBold = (str: string, match: string) => {
    return str.replace(new RegExp(match, "gi"), (match) => `<span style="font-weight: 700;">${match}</span>`);
  };

  const removeBold = (str: string) => {
    return str.replace(/<span style="font-weight: 700;">|<\/span>/gi, "");
  };

  const setInputValue = (val: string) => {
    value = removeBold(val);
    removeResults();
    _this.focus();
  };

  const removeHighlighted = () => {
    let highlighted = document.querySelector(".highlighted");
    if (highlighted) {
      highlighted.classList.remove("highlighted");
    }
  };

  function handleKeydown(event: KeyboardEvent) {
    dispatch("keydown", event);

    if (!autofill && !isTags) return;

    if (event.key === 'Escape') {
      removeResults();
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      let highlighted = document.querySelector(".highlighted");
      let results = document.querySelectorAll(".result-item");

      if (highlighted) {
        highlighted.classList.remove("highlighted");
        let index = Array.from(results).indexOf(highlighted);
        if (event.key === "ArrowDown") {
          if (index + 1 < results.length) {
            results[index + 1].classList.add("highlighted");
          } else {
            results[0].classList.add("highlighted");
          }
        } else {
          if (index - 1 >= 0) {
            results[index - 1].classList.add("highlighted");
          } else {
            results[results.length - 1].classList.add("highlighted");
          }
        }
      } else {
        results[0].classList.add("highlighted");
      }
      return;
    }

    if (event.key === "Enter" && $autofillContent.content.length !== 0) {
      event.preventDefault();
      let highlighted = document.querySelector(".highlighted");
      if (highlighted) {
        let val = highlighted.querySelector(".result-button")?.textContent;
        if (val) {
          dispatch("autofill", { value: val });
          removeHighlighted();
        }
      }
      return;
    }
    
    if (event.key === "Backspace" && value === "" && $tags.length > 0) {
      removeTag($tags[$tags.length - 1]);
      autofillHandler("");
    }
    if (event.key === "Enter" || event.key === "Tab" || event.key === "+" || (event.key === " " && !searchBar)) {
      event.preventDefault();

      if ($autofillContent.content.length > 0) {
        dispatch("autofill", { value });
        return;
      }

      value.split("+").forEach((val : string) => {
        if (val !== "" && $tags.indexOf(val.trim()) === -1){
          addTag(val.trim());
        }
      });
      setInputValue("");
    }
  }
  function handleFocus(event: FocusEvent) {
    dispatch("focus", event);
  }
  function handleBlur(event: FocusEvent) {
    dispatch("blur", event);
  }

  let _this: HTMLInputElement;
  let resultsContainer : HTMLDivElement;
</script>

{#if type === "password"}
  <input
    type="password"
    class={`svelte-input ${className}`}
    {placeholder}
    bind:value
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{:else if type === "textarea"}
  <textarea
    class={`svelte-input ${className}`}
    {placeholder}
    bind:value
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{:else if type === "checkbox"}
  <input
    type="checkbox"
    class={`svelte-input ${className}`}
    bind:checked={isChecked}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{:else if type === "submit"}
  <input
    type="submit"
    class={`svelte-input ${className}`}
    {value}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{:else if type === "button"}
  <input
    type="button"
    class={`svelte-input ${className}`}
    {value}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{:else if type === "hidden"}
  <input
    type="hidden"
    class={`svelte-input ${className}`}
    {value}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{:else if autofill}
  <button
    class="input-container {className}"
    on:click={() => _this.focus()}
    on:focus={() => _this.focus()}
  >
    {#if isTags}
      <div class="tags-container">
        {#each $tags as tag, i}
          <Tag text={tag} className="{i == 0 ? '!ml-0' : ''}" override={true} owonclick={() => {removeTag(tag)}} />
        {/each}
      </div>
    {/if}
    <input
      type="text"
      {placeholder}
      bind:this={_this}
      bind:value
      on:keydown={handleKeydown}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {...$$restProps}
    />
    <div class="results-container" bind:this={resultsContainer}>
      <ul class="results-list">
        {#each $autofillContent.content as item, i}
          <li class={"result-item"}>
            <button 
              class={`result-button`}
              on:click={() => autofillHandler(item)}
            >{@html item}</button>
          </li>
        {/each}
      </ul>
    </div>
  </button>
{:else}
  <input
    type="text"
    class={`svelte-input ${className}`}
    {placeholder}
    bind:value
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    {...$$restProps}
  />
{/if}

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

    .tags-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      flex-wrap: wrap;
    }

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

  .svelte-input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
  }

  .svelte-input[type="submit"],
  .svelte-input[type="button"] {
    padding: 0.5rem 1.4rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    background-color: rgba(40, 40, 40);
    font-size: 1rem;
    &:hover {
      filter: brightness(0.9);
    }
    &:disabled {
      background-color: rgba(0, 0, 0, 0.5);
      cursor: not-allowed;
    }
  }

  textarea {
    min-height: 300px;
  }
</style>
