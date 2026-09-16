<script lang="ts">
  import { onMount } from "svelte";
  import { page, device } from "$lib/../stores/index";
  import { initializeLocale } from "$lib/i18n";
  import Navbar from "$lib/components/Navbar.svelte";
  import type { LayoutData } from "./$types";
  import "../app.css";
  import "../global.scss";

  export let data: LayoutData;

  onMount(() => {
    initializeLocale();
  });

  onMount(() => {
    $device = window.innerWidth < 768 ? "mobile" : "desktop";
    window.addEventListener("resize", () => {
      $device = window.innerWidth < 768 ? "mobile" : "desktop";
    });
  });
</script>

<svelte:head>
  <script
    data-name="BMC-Widget"
    data-cfasync="false"
    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    data-id="aoof"
    data-description="Support me on Buy me a coffee!"
    data-message=""
    data-color="#FF813F"
    data-position="Right"
    data-x_margin="18"
    data-y_margin="18"
  ></script>
</svelte:head>

<Navbar settings={data.content.settings} />

<main>
  <article
    class="min-h-screen flex items-center justify-center lg:w-1/2 md:w-2/3 sm:max-w-full mx-auto"
  >
    <slot />
  </article>

  <button
    class="fixed bottom-4 left-4 bg-dark text-white p-2 rounded-full shadow-lg btn-scroll-up hidden"
    on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Scroll to top"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</main>

<style>
  /* @import url('https://kit.fontawesome.com/b41f14ba9b.js'); */
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
  @import url("https://fonts.googleapis.com/css2?family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap");
</style>
