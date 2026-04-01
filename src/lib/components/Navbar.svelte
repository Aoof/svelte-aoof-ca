<script lang="ts">
    import { writable } from 'svelte/store';
    import { language, anchors, change_lang } from '$lib/../stores/index';
    import { _ } from 'svelte-i18n';
    import ResumeModal from '$lib/components/ResumeModal.svelte';

    const toggle_lang = async () => {
        if ($language === 'en') {
            await change_lang('fr');
        } else {
            await change_lang('en');
        }
    }

    const buttons = writable<HTMLButtonElement[]>(new Array(anchors.length));
    const isDropdownOpen = writable(false);
    let isResumeModalOpen = false;

    const toggleDropdown = () => {
        isDropdownOpen.update(n => !n);
    }

    const openResumeModal = () => {
        isResumeModalOpen = true;
    }
</script>

<style>
    .dropdown-menu {
        overflow: hidden;
        transition: height 0.3s ease;
    }

    .dropdown-menu.closed {
        height: 0;
    }

    .dropdown-menu.open {
        height: auto;
    }
</style>

<nav class="bg-dark border-b border-gray top-0 sticky w-full h-16 px-8 flex items-center z-50">
    <a href="/" class="text-white hover:text-pink text-xl font-bold no-underline">{$_('navbar.brand')}</a>
    <div class="flex gap-4 items-center justify-end w-full px-4">
        <button class="text-white hover:text-pink text-xl cursor-pointer md:hidden" on:click={toggleDropdown}>
            <i class="fas fa-bars"></i>
        </button>
        <div class="buttons-container gap-4 items-center justify-center w-full hidden md:flex">
            {#each anchors as btn, i}
                <a class="text-white hover:text-pink cursor-pointer text-sm" href="#{btn.name}">{$_(`navbar.${btn.name}`)}</a>
            {/each}
        </div>
    </div>
    <div class="flex gap-4 items-center justify-center">
        <button class="text-white hover:text-pink text-sm cursor-pointer" on:click={toggle_lang}>{$language === 'en' ? $_('navbar.language') : 'EN'}</button>
        <button class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer" on:click={openResumeModal}>{$_('navbar.resume')}</button>
    </div>
    <div class="dropdown-menu absolute bg-dark w-full top-14 left-0 {$isDropdownOpen ? 'open border-b py-3' : 'closed'} md:hidden border-gray">
        {#each anchors as btn, i}
            <a class="block text-white hover:text-pink cursor-pointer text-sm py-2 px-4 text-center" href="#{btn.name}">{$_(`navbar.${btn.name}`)}</a>
        {/each}
    </div>
</nav>

<ResumeModal bind:open={isResumeModalOpen} />