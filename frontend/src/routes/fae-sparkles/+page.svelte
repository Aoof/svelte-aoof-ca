<script>
  import { goto } from '$app/navigation';

    // User is logged in this is the page that will be displayed
    import { logout } from '$lib/../stores/auth';
    import { addToast } from '$lib/../stores/toasts';

    import Button from '$lib/components/Button.svelte';
    import Recipes from '$lib/components/Recipes.svelte';

    async function handleLogout() {
        await logout();
        localStorage.clear();
        addToast({
            message: "Logout successful",
            type: "success",
            dismissible: true,
            timeout: 3000
        });

        window.location.reload();
    }
</script>


<style>

</style>

<main class="fae-grimoire relative container lg:px-52 m-auto">
    <div class="header text-center text-4xl pt-44 select-none">
        <a href="/fae-sparkles">
            <h1>Fae's Grimoire</h1>
        </a>
    </div>
    <div class="actions-wrapper flex justify-between mt-4">
        <Button text="Add" on:click={() => {goto('/fae-sparkles/add-recipe')}} />
        <Button text="Logout" on:click={handleLogout} />
    </div>
    <div class="recipes-wrapper">
        <Recipes />
    </div>
</main>