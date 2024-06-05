<script>
    // User is logged in this is the page that will be displayed
    import { logout } from '$lib/../stores/auth';
    import { addToast } from '$lib/../stores/toasts';

    import Button from '$lib/../components/Button.svelte';
    import Recipes from '$lib/../components/Recipes.svelte';

    async function handleLogout() {
        await logout();
        localStorage.clear();
        addToast({
            message: "Logout successful",
            type: "success",
            dismissible: true
        });

        window.location.href = '/fae-sparkles';
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
    <div class="actions-wrapper flex justify-between">
        <Button text="Add" callback={() => {window.location.href = '/fae-sparkles/add-recipe'}} />
        <Button text="Logout" callback={handleLogout} />
    </div>
    <div class="recipes-wrapper">
        <Recipes />
    </div>
</main>