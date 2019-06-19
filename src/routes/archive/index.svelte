<script context="module">
  import { format } from 'date-fns';

  const currentDate = format(new Date(), 'YYYY-MM-DD');
	export async function preload() {
    return this.redirect(302, `archive/${currentDate}`);
  }
</script>


<svelte:head>
  <title>Archívum</title>
</svelte:head>
