<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { device } from '$lib/../stores/index';
</script>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;

        gap: 1rem;
        justify-items: center;

        justify-content: space-between;
        height: stretch;

        padding: 1rem 0;

        .content-group {
            padding: 1rem;

            h1, h2 {
                margin: 0;
            }

            div {
                margin: 20px 0; 
            }
        }
    }

    .tags-container {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .tag {
        background-color: #333;
        padding: 0.25rem 0.5rem;
        border-radius: 5px;

        font-size: 1rem;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        i {
            color: white;
            margin: 0 0.25rem;
        }

        svg {
            fill: white;
            width: 1.5rem;
            height: 1.5rem;
            display: inline-block;
        }
    }
</style>

<article class="bg-dark w-full p-4 rounded-lg h-full justify-center align-middle top-0 absolute" transition:fly={$device === 'desktop' ? { x: -20, duration: 500 } : { y: -20, duration: 500 }}>
    <div class="window-controls flex justify-end gap-2 mb-4">
        <div class="window-control bg-red w-3 h-3 rounded-full"></div>
        <div class="window-control bg-yellow w-3 h-3 rounded-full"></div>
        <div class="window-control bg-green w-3 h-3 rounded-full"></div>
    </div>

    <div class="content">
        <div class="content-group">
            <h1 class="text-2xl text-center">About Me</h1>
            <p class="my-4 text-lg">
                I am a Concordia University student studying Computer Engineering. 
                I am passionate about software development and have experience in web development and Game development. 
                I am always eager to learn new technologies and improve my skills.</p>
        </div>

        <div class="content-group">
            <h2 class="text-xl text-center">Skills</h2>
            <div class="tags-container text-lg">
                <span class="tag" title="HTML"><i class="fa-brands fa-html5"></i></span>
                <span class="tag" title="CSS"><i class="fa-brands fa-css3"></i></span>
                <span class="tag" title="JavaScript"><i class="fa-brands fa-js"></i></span>
                <span class="tag" title="React"><i class="fa-brands fa-react"></i></span>
                <span class="tag" title="Svelte"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.25 122.88"><defs><style>.a{fill:#ff3e00;}.b{fill:#fff;}</style></defs><title>svelte</title><path class="a" d="M95.73,16.26C84.32-.07,61.78-4.91,45.49,5.47L16.87,23.71A32.83,32.83,0,0,0,2,45.69a35.13,35.13,0,0,0-.55,6.14,34.69,34.69,0,0,0,4,16.06A33,33,0,0,0,.54,80.16a35,35,0,0,0,6,26.46c11.41,16.33,34,21.17,50.24,10.79L85.37,99.17a32.76,32.76,0,0,0,14.83-22,34.08,34.08,0,0,0,.55-6.13A34.72,34.72,0,0,0,96.8,55a33,33,0,0,0,4.91-12.26,36,36,0,0,0,.54-6.13,34.93,34.93,0,0,0-6.52-20.33Zm0,0Z"/><path class="b" d="M42.69,108.16a22.94,22.94,0,0,1-5.72.73A22.7,22.7,0,0,1,18.3,99.11a21,21,0,0,1-3.92-12.23,21.6,21.6,0,0,1,.32-3.68,20.52,20.52,0,0,1,.69-2.67l.54-1.64L17.39,80a37.13,37.13,0,0,0,11.2,5.6l1.06.32-.1,1.06c0,.18,0,.37,0,.55a6.36,6.36,0,0,0,1.18,3.7,6.82,6.82,0,0,0,5.62,3,6.65,6.65,0,0,0,1.72-.22,6.28,6.28,0,0,0,1.76-.77L68.42,74.91a6,6,0,0,0,2.79-5.09A6.35,6.35,0,0,0,70,66.13a6.85,6.85,0,0,0-5.63-2.94,6.65,6.65,0,0,0-1.72.22,6,6,0,0,0-1.75.77L50,71.14a21.06,21.06,0,0,1-5.81,2.55,23.06,23.06,0,0,1-5.72.73A22.73,22.73,0,0,1,19.8,64.65a21.05,21.05,0,0,1-3.92-12.23,21.6,21.6,0,0,1,.32-3.68,19.82,19.82,0,0,1,8.92-13.23L53.74,17.28a21,21,0,0,1,5.81-2.56A23,23,0,0,1,65.27,14,22.74,22.74,0,0,1,84,23.76,21.05,21.05,0,0,1,87.87,36a21.72,21.72,0,0,1-.32,3.69,20.52,20.52,0,0,1-.69,2.67L86.32,44l-1.46-1.07a36.9,36.9,0,0,0-11.2-5.6L72.6,37l.1-1.06c0-.18,0-.37,0-.55a6.42,6.42,0,0,0-1.18-3.71,6.85,6.85,0,0,0-5.62-2.94A6.65,6.65,0,0,0,64.2,29a5.89,5.89,0,0,0-1.76.77L33.82,48a6,6,0,0,0-2.69,4A6.92,6.92,0,0,0,31,53.06a6.35,6.35,0,0,0,1.18,3.69,6.84,6.84,0,0,0,5.62,2.94,6.65,6.65,0,0,0,1.72-.22,6,6,0,0,0,1.76-.77l10.92-7a20.93,20.93,0,0,1,5.81-2.55,23,23,0,0,1,5.72-.73,22.74,22.74,0,0,1,18.68,9.77,21.05,21.05,0,0,1,3.92,12.23A20.64,20.64,0,0,1,86,74.14a19.78,19.78,0,0,1-8.92,13.23L48.51,105.6a21,21,0,0,1-5.82,2.56Zm0,0Z"/></svg>
                </span>
                <span class="tag" title="Node.js"><i class="fa-brands fa-node-js"></i></span>
                <span class="tag" title="Express.js"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 773.55" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M1333.33 753.49c-48.5 12.33-78.5.54-105.41-39.87L1036.5 448.79l-27.67-36.67L785.29 714.5c-25.54 36.38-52.33 52.2-100 39.33l286.25-384.25-266.5-347.09c45.83-8.91 77.5-4.38 105.62 36.67l198.54 268.13 200-266.67c25.62-36.38 53.17-50.2 99.17-36.8l-103.33 137-140 182.29c-16.67 20.83-14.38 35.09.96 55.2l267.33 355.18zM.34 363.16l23.41-115.17c63.75-227.92 325-322.63 505.17-181.8 105.29 82.83 131.46 200 126.25 331.25H61.67C52.76 633.69 222.8 776.27 439.58 703.53c76.04-25.54 120.83-85.09 143.25-159.58 11.38-37.33 30.2-43.17 65.29-32.5-17.91 93.17-58.33 171-143.75 219.71-127.62 72.91-309.8 49.33-405.62-52C41.66 620.36 18.08 545.87 7.5 466.2c-1.67-13.17-5-25.71-7.5-38.33.22-21.56.34-43.11.34-64.67v-.04zm62.41-15.83h536.33c-3.5-170.83-109.87-292.17-255.25-293.2-159.58-1.25-274.17 117.2-281.09 293.2h.01z" fill-rule="nonzero"/></svg>
                </span>
                <span class="tag" title="Python"><i class="fa-brands fa-python"></i></span>
                <span class="tag" title="Java"><i class="fa-brands fa-java"></i></span>
                <span class="tag" title="C"><i class="fa-brands fa-c"></i></span>
                <span class="tag" title="C++">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109.19 122.88" style="enable-background:new 0 0 109.19 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#00599C;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#004482;} .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#659AD2;} .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><g><path class="st0" d="M107.81,92.16c0.86-1.48,1.39-3.16,1.39-4.66V35.38c0-1.5-0.53-3.17-1.39-4.66L54.6,61.44L107.81,92.16 L107.81,92.16z"/><path class="st1" d="M59.33,121.75l45.14-26.06c1.3-0.75,2.48-2.05,3.34-3.53L54.6,61.44L1.39,92.16c0.86,1.48,2.04,2.78,3.34,3.53 l45.14,26.06C52.47,123.26,56.73,123.26,59.33,121.75L59.33,121.75z"/><path class="st2" d="M107.81,30.72c-0.86-1.48-2.04-2.78-3.34-3.53L59.33,1.13c-2.6-1.5-6.86-1.5-9.46,0L4.73,27.19 C2.13,28.69,0,32.37,0,35.38V87.5c0,1.5,0.53,3.17,1.39,4.66L54.6,61.44L107.81,30.72L107.81,30.72z"/><path class="st3" d="M54.6,97.84c-20.07,0-36.4-16.33-36.4-36.4c0-20.07,16.33-36.4,36.4-36.4c12.95,0,25.03,6.97,31.52,18.19 l-15.75,9.12c-3.25-5.62-9.29-9.1-15.77-9.1c-10.04,0-18.2,8.16-18.2,18.2c0,10.03,8.16,18.2,18.2,18.2 c6.48,0,12.52-3.49,15.77-9.1l15.75,9.12C79.63,90.87,67.55,97.84,54.6,97.84L54.6,97.84z"/><polygon class="st3" points="91,59.42 86.95,59.42 86.95,55.37 82.91,55.37 82.91,59.42 78.86,59.42 78.86,63.46 82.91,63.46 82.91,67.51 86.95,67.51 86.95,63.46 91,63.46 91,59.42"/><polygon class="st3" points="106.16,59.42 102.12,59.42 102.12,55.37 98.07,55.37 98.07,59.42 94.03,59.42 94.03,63.46 98.07,63.46 98.07,67.51 102.12,67.51 102.12,63.46 106.16,63.46 106.16,59.42"/></g></svg>
                </span>
                <span class="tag" title="Git"><i class="fa-brands fa-git"></i></span>
                <span class="tag" title="Docker"><i class="fa-brands fa-docker"></i></span>
                <span class="tag" title="MongoDB"><i class="fas fa-database"></i> MongoDB</span>
                <span class="tag" title="MySQL"><i class="fas fa-database"></i> MySQL</span>
            </div>
        </div>

        <div class="content-group">
            <h2 class="text-xl text-center">About this Website</h2>
            <p class="my-4 text-lg">
                This website is built using SvelteKit, a framework for building web applications.
                It has a responsive design and is optimized for performance.
                There are some hidden features for me and my friends to enjoy.
                These features are built using SvelteKit's server-side rendering and API routes.
                With Express.js and MongoDB, I created a RESTful API to store and retrieve data.
            </p>
        </div>
    </div>
</article>