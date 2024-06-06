<script lang="ts">
    import { createEventDispatcher } from "svelte";
  import type { ChangeEventHandler } from "svelte/elements";

    import { writable } from "svelte/store";

    export let className : string = '';
    export let placeholder : string = '';
    export let type : string = 'text';
    export let value : any = '';

    export let autofill : boolean = false;
    export let isTags : boolean = false;

    export let tags : string[] = [];

    const dispatch = createEventDispatcher();

    function handleKeydown(event : KeyboardEvent) { dispatch('keydown', event); }
    let _this : HTMLInputElement;
</script>

<style lang="scss">
    .svelte-input, .input-container {
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
    }

    .input-container {
        position: relative;
        cursor: text;

        display: flex;
        flex-direction: row;
        align-items: left;
        justify-content: left;

        input {
            border: none;
            border-radius: 0.25rem;
            background-color: rgba(40, 40, 40);
            color: #fff;
            font-size: 1rem;

            width: 100%;
            &:focus {
                outline: none;
            }
        }
    }

    .svelte-input[type="checkbox"] {
        width: auto;
        margin-right: 0.5rem;
    }

    .svelte-input[type="submit"], .svelte-input[type="button"] {
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
        min-height: 200px;
    }
</style>

{#if type === 'password'}
    <input
        type="password"
        class={`svelte-input ${className}`}
        placeholder={placeholder}
        bind:value={value}
        on:keydown={handleKeydown}
        {...$$restProps}
    />
{:else if type === 'textarea'}
    <textarea
        class={`svelte-input ${className}`}
        placeholder={placeholder}
        bind:value={value}
        on:keydown={handleKeydown}
        {...$$restProps}
    />
{:else if type === 'checkbox'}
    <input
        type="checkbox"
        class={`svelte-input ${className}`}
        bind:checked={value}
        on:keydown={handleKeydown}
        {...$$restProps}
    />
{:else if type === 'submit'}
    <input
        type="submit"
        class={`svelte-input ${className}`}
        value={value}
        on:keydown={handleKeydown}
        {...$$restProps}
    />
{:else if type === 'button'}
    <input
        type="button"
        class={`svelte-input ${className}`}
        value={value}
        on:keydown={handleKeydown}
        {...$$restProps}
    />
{:else if type === 'hidden'}
    <input
        type="hidden"
        class={`svelte-input ${className}`}
        value={value}
        on:keydown={handleKeydown}
        {...$$restProps}
    />
{:else}
    {#if autofill}
        <button class='input-container {className}' on:click={() => _this.focus()} on:focus={() => _this.focus()}>
            {#if isTags}
                <div class="tags-container">
                    {#each tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {/if}
            <input
                type="text"
                placeholder={placeholder}
                bind:this={_this}
                bind:value={value}
                on:keydown={handleKeydown}
                autocomplete="on"
                {...$$restProps}
            />
            <div id="results-container">
                <ul class="results-list"></ul>
            </div>
        </button>
    {:else}
        <input
            type="text"
            class={`svelte-input ${className}`}
            placeholder={placeholder}
            bind:value={value}
            on:keydown={handleKeydown}
            {...$$restProps}
        />
    {/if}
{/if}