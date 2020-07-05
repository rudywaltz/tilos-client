<style>
  .wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-bottom: 30px;
  }
</style>

<script context="module">
  export async function preload() {
    let recommendedList = [];
    try {
      const res = await this.fetch('/api/v1/episode/lastWeek');
      recommendedList = await res.json();
    } catch (e) {
      console.log('error in Fetch', e);
    }

    return {
      recommendedList,
    };
  }
</script>

<script>
  import {
    playlist,
    song
  } from '../components/stores';
  import {
    episodeMapper
  } from '../helpers';
  import Episode from '../components/Episode.svelte';

  export let recommendedList;
  export let formattedRecommendedList = episodeMapper(recommendedList);

  function clearAll() {
    $song = {};
    $playlist = [];
    localStorage.clear();
    console.log('cleared', $song, $playlist);
  }
</script>

<svelte:head>
  <title>Tilos Rádió</title>
</svelte:head>
<button on:click="{clearAll}">Clear all</button>
<h1>Ajánló</h1>
<div class="wrap">
  {#each formattedRecommendedList as episode}
    <Episode {...episode} />
  {:else}Nincs elérhető adás{/each}
</div>
