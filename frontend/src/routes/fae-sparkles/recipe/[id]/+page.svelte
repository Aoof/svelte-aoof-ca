<script lang="ts">
    import { page } from '$app/stores';
    
    import SingleRecipe from '$lib/components/Fae/SingleRecipe.svelte';
</script>

<SingleRecipe id={$page.params.id} />