<script lang="ts">
    import { page } from '$app/stores';
    
    import SingleRecipe from '$lib/components/SingleRecipe.svelte';
</script>

<SingleRecipe id={$page.params.id} />