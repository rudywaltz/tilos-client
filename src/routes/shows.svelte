<script context="module">
	export async function preload() {
    let shows = [];
    try {
      const res = await this.fetch('/shows.json', {
			  credentials: 'include'
      });
    shows = await res.json();
    } catch(e) {
      console.log('error in Fetch', e);
    }
		return { shows };
  }
</script>
<script>
  import Showlist from "../components/Showlist.svelte";

 export let shows;
</script>

<svelte:head>
  <title>Műsorok</title>
</svelte:head>

<h1>Műsorok</h1>
<hr>
<br>
{#each shows as show}
  <Showlist { ...show }></Showlist>
{/each}
