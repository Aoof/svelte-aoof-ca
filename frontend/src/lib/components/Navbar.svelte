<script lang="ts">
    import { writable } from 'svelte/store';

    import { page, anchors, device, change_page } from '$lib/../stores/index';
    import { fly, fade, scale } from 'svelte/transition';

    import { onMount } from 'svelte';

    const buttons = writable<HTMLButtonElement[]>(
        new Array(anchors.length)
    );

    const cursorElement = writable<HTMLElement>();
    const activeButton = writable<HTMLButtonElement>();

    onMount(() => {
        $activeButton = $buttons[anchors.findIndex(btn => btn.name == $page)];
        $cursorElement = document.querySelector('.active-selector') as HTMLElement;
        if ($device == 'desktop') {
            $cursorElement.style.top = `${$activeButton.offsetTop}px`;
            window.addEventListener('resize', () => {
                $cursorElement.style.top = `${$activeButton.offsetTop}px`;
                $cursorElement.style.left = `${$activeButton.offsetLeft}px`;
            });
        } else {
            $cursorElement.style.left = `${$activeButton.offsetLeft}px`;
            window.addEventListener('resize', () => {
                $cursorElement.style.top = `${$activeButton.offsetTop}px`;
                $cursorElement.style.left = `${$activeButton.offsetLeft}px`;
            });
        }
    })


    $ : if (page) {
        $activeButton = $buttons[anchors.findIndex(btn => btn.name == $page)];
        if ($activeButton) {
            if ($device == 'desktop') {
                $cursorElement.style.top = `${$activeButton.offsetTop}px`;
            } else {
                $cursorElement.style.left = `${$activeButton.offsetLeft}px`;
            }
        }
    }
</script>

<style lang="scss">
    .side-bar {
        position: fixed;
        top: 0;
        left: 10%;
        height: 100vh;
        width: 60px;

        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 768px) {
            left: 0;
            bottom: 0;
            top: auto;
            width: stretch;
            height: 70px;
        }

        .buttons-container {
            position: relative;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            background: rgba(40, 40, 40);
            height: 70%;

            border-radius: 2rem;

            @media (max-width: 768px) {
                flex-direction: row;
                width: 100%;
                height: 70px;

                border-radius: 0;
            }

            .active-selector {
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 70px;

                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 2rem;
                transition: 0.3s;

                @media (max-width: 768px) {
                    top: 0;
                    left: 0;
                    width: 70px;
                    height: stretch;
                }
            }

            button {
                position: relative;

                background-color: transparent;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                
                width: 70px;
                height: 70px;
                border-radius: 50%;
            }
        }
    }
</style>

<nav class="side-bar z-10">
    <div class="buttons-container">
        <span class="active-selector" bind:this={$cursorElement}></span>
        {#each anchors as btn, i}
            <button on:click={() => change_page(btn.name)} class={`relative ${$page == btn.name ? 'active' : ''}`} bind:this={$buttons[i]}>
                {#if $page == btn.name}
                    <span 
                        class="text-xs w-full absolute top-0 left-0 right-0 bottom-0 m-auto h-fit font-bold" 
                        in:fly={{y: -20, duration: 500}}
                        out:scale={{duration: 200}}
                    >{btn.name.toUpperCase()}</span>
                {:else}
                    <i class={btn.icon} 
                        in:fly={{y: -20, duration: 200}}
                        out:scale={{duration: 500}}
                    ></i>
                {/if}
            </button>
        {/each}
    </div>
</nav>