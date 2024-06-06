<script lang="ts">
  import type { Recipe } from "$lib/types";

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

    .tag {
        color: #000;
        padding: 0.25rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        font-size: 1rem;
        background-color: #E0AFA0;
        transition: background-color 0.3s;  
        &:hover {
          background-color: #e0afa0d3;
        }

        @media (max-width: 768px) {
            font-size: 0.75rem;
        }
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
        svg {
            width: 2rem;
            height: 2rem;
            fill: #40cb40;
        } 
    }
    
    &:hover {
        background-color: rgba(30, 30, 30);
    }
  }
</style>

<a class="recipe select-none relative" href="/fae-sparkles/recipes/{recipe._id}">
    {#if recipe.vegetarian}
      <div class="vegetarian">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-49.9 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z"/>
        </svg>
      </div>
    {/if}
    <h2 class="w-full text-3xl my-3">{recipe.title}</h2>
    <p class="w-full text-xl my-3">{recipe.foodType} - {recipe.cookTime}</p>
    <div class="flex flex-row w-full flex-wrap">
        {#each recipe.tags as tag}
            <p class="tag">{tag}</p>
        {/each}
    </div>

    <div class="created-date">
        <p>Created: {createdDate}</p>
    </div>
</a>
