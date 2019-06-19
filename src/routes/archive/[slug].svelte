<script context="module">
  const { findTimeZone, setTimeZone } = require('timezone-support');

  export async function preload(page) {
    const { slug } = page.params;
    const date = slug.split('-');
    const budapest = findTimeZone('Europe/Budapest');
    const dayStart  = setTimeZone({ year: date[0], month: date[1], day: date[2], hours: 0, minutes: 0 }, budapest).epoch;
    const dayEnd = setTimeZone({ year: date[0], month: date[1], day: date[2], hours: 24, minutes: 0 }, budapest).epoch;
    let episodes = [];

     try {
      if (isNaN(dayStart) || isNaN(dayEnd)) {
        return { episodes, slug };
      }

      const res = await this.fetch(`https://tilos.hu/api/v1/episode?start=${dayStart}&end=${dayEnd}`, {
        credentials: 'include'
      });
      episodes = await res.json();
    } catch(e) {
      console.log('error in Fetch', e);
    }
    return { episodes, slug };
  }
</script>

<script>
  import { addDays, format as dFormat } from 'date-fns';
  import Episode from '../../components/Episode.svelte';
  import { format } from '../../helpers';
  export let episodes;
  export let slug;

  $: episodes = episodes.map(episode => {
    return {
      name: episode.show.name,
      showId: episode.show.id,
      inThePast: episode.inThePast,
      text: episode.text ? episode.text.title : '------',
      mp3: episode.m3uUrl ? episode.m3uUrl.slice(0, -3) + 'mp3' : '',
      duration: (episode.realTo - episode.realFrom) / 1000
    }
  });

  $: prevDay = `/archive/${dFormat(addDays(new Date(slug), -1), 'YYYY-MM-DD')}`;
  $: nextDay = `/archive/${dFormat(addDays(new Date(slug), 1), 'YYYY-MM-DD')}`;
</script>

<style>
  .archive {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0 -1rem;
    list-style-type: none;
    padding: 0;
  }
</style>



<svelte:head>
  <title>Archívum</title>
</svelte:head>

<h1>Archívum</h1>
<div>
  <a href="{ prevDay }" rel=prefetch>Előző Nap</a>
  { slug }
  <a href="{ nextDay }" rel=prefetch>Következő Nap</a>
</div>
<div class="archive">
  {#each episodes as episode}
    <Episode {...episode}></Episode>
  {:else}
    Nincs elérhető adás
  {/each}
</div>
