<script lang="ts">
  import type { Recipe } from "$lib/types";

  import Tag from "./Tag.svelte";

  /**
   * interface Recipe {
   *      _id: string;
   *      title: string;
   *      instructions: string;
   *      cookTime: string;
   *      foodType: string;
   *      tags: string[];
   *      vegetarian: boolean;
   *      ingredients: Ingredient[];
   * }
   */

  /**
   * interface Ingredient {
   *    ingredient: string;
   *    amount: string;
   * }
   */

  export let recipe: Recipe;

  let createdDate = new Date(recipe.createdDate).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

</script>


<style lang="scss">
  .recipe {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    box-shadow: 0 0 7px rgba(0, 0, 0);
    background-color: rgba(40, 40, 40);
    transition: background-color 0.3s;
    
    padding: 1rem;
    margin: 1rem 0;
    padding-top: 2rem;
    cursor: pointer;

    * {
        color: #fff;
        font-weight: 600;
    }

    .created-date {
        margin-top: 1rem;
        font-size: 0.75rem;
        width: stretch;
        text-align: right;
    }

    .vegetarian {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    
    &:hover {
        background-color: rgba(30, 30, 30);
    }
  }
</style>

<a class="recipe select-none relative" href="/fae-sparkles/recipe/{recipe._id}">
    {#if recipe.vegetarian}
      <div class="vegetarian">
        <i class="fas fa-leaf !text-green !text-xl"></i>
      </div>
    {/if}
    <h2 class="w-full text-2xl my-1">{recipe.title}</h2>
    <p class="w-full text-lg my-1">{recipe.foodType} - {recipe.cookTime}</p>
    <div class="flex flex-row w-full flex-wrap">
        {#each recipe.tags as tag, i}
          <Tag text={tag} className="{i == 0 ? '!ml-0' : ''}" />
        {/each}
    </div>

    <div class="created-date">
        <p>Created: {createdDate}</p>
    </div>
</a>
