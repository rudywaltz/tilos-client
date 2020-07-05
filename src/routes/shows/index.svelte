<script context="module">
  export async function preload({
    query: {
      type,
      status = 'active'
    }
  }) {
    let shows = [];
    try {
      const res = await this.fetch('/api/v1/show?status=all');
      shows = await res.json();
    } catch (e) {
      console.log('error in Fetch', e);
    }

    shows = shows.filter(function filterByParams(show) {
      // TODO: status can be legend
      return (
        show.status.toLowerCase() === status.toLocaleLowerCase() &&
        (type !== undefined ?
          show.type.toLowerCase() === type.toLowerCase() :
          true)
      );
    });

    return {
      shows,
    };
  }
</script>

<script>
  import Showlist from '../../components/Showlist.svelte';
  import {
    normailezeString
  } from '../../helpers';
  export let shows;

  let searchTerm = '';

  function condition(show) {
    return (
      normailezeString(show.name).indexOf(normailezeString(searchTerm)) !== -1
    );
  }

  $: filteredShows = searchTerm.length ? shows.filter(condition) : shows;
</script>

<svelte:head>
  <title>Műsorok</title>
</svelte:head>

<h1>Műsorok</h1>
<hr />
<input type="serach" bind:value="{searchTerm}" />
<br />
{#each filteredShows as show}
  <Showlist {...show} />
{/each}
