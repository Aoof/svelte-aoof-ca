<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { device } from '$lib/../stores/index';

    import resume from '$lib/media/resume.pdf';

    let texts : string[] = [];
    let elements : ChildNode[] = [];
    let speed = 10;
    let wordIndex = 0;
    let textIndex = 0;

    let cursor : HTMLSpanElement;

    onMount(() => {
        let container = document.querySelector('.typewriter-message');

        container && handleNode(container);
        elements.forEach((element) => { element.textContent = ''; });

        let interval = setInterval(() => {
            if (wordIndex === texts[textIndex].length) {
                wordIndex = 0;
                textIndex++;
                if (textIndex === texts.length) {
                    clearInterval(interval);
                    return;
                }
            }

            try {
                elements[textIndex].textContent += texts[textIndex].charAt(wordIndex);
                (elements[textIndex] as HTMLElement).insertAdjacentElement('beforeend', cursor as HTMLElement);
            } catch (e) {
                console.error(e);
                clearInterval(interval);
                return;
            }

            wordIndex++;
        }, speed);
    });


    function handleNode(node : ChildNode) {
        if ((node as HTMLElement).classList?.contains('cursor')) return;
        let isLowestNode = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;
        if (isLowestNode) {
            texts.push(node.childNodes[0].textContent as string);
            elements.push(node);
        } else {
            node.childNodes.forEach(child => handleNode(child));
        }
    }
</script>

<style lang="scss">
    .typewriter-message {
        * {
            font-family: 'Victor Mono' !important;
            letter-spacing: 0.1em !important;
        }


        #cursor {
            display: inline-block;
            width: 1px;
            height: 1em;
            background-color: #f8f8f2;
            animation: blink .8s infinite;
        }

        @keyframes blink {
            0% {
                background: #f8f8f2;
            }

            50% {
                background: transparent;
            }

            100% {
                background: #f8f8f2;
            }
        }

        .html-tag {
            color: #f8f8f2;

            .text {
                color: lightgreen;
            }

            &.anchor-tag {
                .content {
                    text-decoration: underline;
                }

                &:hover {
                    cursor: pointer;
                    background-color: #44475a;
                }
            }
        }

        .json {
            color: #f8f8f2;

            .const {
                color: #ff79c6;
            }

            .operator {
                color: #ff79c6;
            }

            .bracket {
                color: #f8f8f2;
            }

            .key {
                color: #8be9fd;
            }

            .string {
                color: #f1fa8c;

                &.anchor:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }

            .indent {
                margin-left: 1.5em;
            }
        }
    }
</style>

<article class="h-full bg-dark rounded-xl p-4 absolute top-0" transition:fly={$device === 'desktop' ? { x: -20, duration: 500 } : { y: -20, duration: 500 }}>
    <div class="window-controls flex justify-end gap-2">
        <div class="window-control bg-red w-3 h-3 rounded-full"></div>
        <div class="window-control bg-yellow w-3 h-3 rounded-full"></div>
        <div class="window-control bg-green w-3 h-3 rounded-full"></div>
    </div>
    <div class="typewriter-message flex flex-row flex-wrap leading-relaxed p-9">
        <div class="html-tag w-full">
            <span><span id="cursor" bind:this={cursor}></span>&lt;</span><span class="text">title</span><span>&gt;</span>
            <span>Welcome to my portfolio!</span>
            <span>&lt;/</span><span class="text">title</span><span>&gt;</span>
        </div>

        <div class="html-tag w-full">
            <span>&lt;</span><span class="text">script</span><span>&gt;</span>
        </div>

        <div class="json">
            <span class="const">const</span> <span>info</span> <span class="operator">=</span> <span class="bracket"> &#123;</span>
            <div class="indent">
                <div><span class="key">fullName</span><span>: </span><span class="string">"Abdulrahman Mousa"</span><span>,</span></div>
                <div><span class="key">preferredName</span><span>: </span><span class="string">"Rahman"</span></div>
                <div><span class="key">nickname</span><span>: </span><span class="string">"aoof"</span><span>,</span></div>
                <div><span class="key">pronunciation</span><span>: </span><a class="string anchor" target="_blank" href="https://translate.google.com/?sl=ar&tl=en&text=%D8%B9%D9%8F%D9%88%D9%81%D9%92&op=translate">"(ʕu:f)"</a><span>,</span></div>
            </div>
            <span class="bracket">&#125;</span><span>;</span>
        </div>

        <div class="html-tag w-full">
            <span>&lt;/</span><span class="text">script</span><span>&gt;</span>
        </div>

        <br><br>
        <br><br>

        <a class="html-tag anchor-tag text-left" download="Abdulrahman_Mousa_Resume.pdf" href={resume} rel='noopener noreferrer'>
            <span>&lt;</span><span class="text">a</span><span>&gt;</span>
            <span class="content">Click here to download resume</span>
            <span>&lt;/</span><span class="text">a</span><span>&gt;</span>
        </a>
    </div>
</article>