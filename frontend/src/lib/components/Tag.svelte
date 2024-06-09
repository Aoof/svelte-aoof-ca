<script>
    export let text;
    export let className = '';
</script>

<style lang="scss">
    .tag {
        color: #000;
        padding: 0.25rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 600;
        background-color: #E0AFA0;
        transition: background-color 0.3s;  
        &:hover {
          background-color: #e0afa0d3;
        }

        @media (max-width: 768px) {
            font-size: 0.75rem;
        }
    }
</style>

<span class="tag {className}" {...$$restProps}>{text}</span>