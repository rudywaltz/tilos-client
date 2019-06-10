<script context="module">
  const {findTimeZone, setTimeZone } = require('timezone-support');

  export async function preload(page, session) {
    const { slug } = page.params;
    const date = slug.split('-');
    const budapest = findTimeZone('Europe/Budapest');
    const dayStart  = setTimeZone({ year: date[0], month: date[1], day: date[2], hours: 0, minutes: 0 }, budapest).epoch;
    const dayEnd = setTimeZone({ year: date[0], month: date[1], day: date[2], hours: 24, minutes: 0 }, budapest).epoch;
    let episodes = [];
     try {
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
  import Episode from '../../components/Episode.svelte';
  import { format } from '../../helpers';
  export let episodes;
  export let slug;
  let newEpisodes = [];

  episodes.forEach(episode => {
    newEpisodes.push({
      name: episode.show.name,
      showId: episode.show.id,
      inThePast: episode.inThePast,
      text: episode.text ? episode.text.title : '------',
      mp3: episode.m3uUrl ? episode.m3uUrl.slice(0, -3) + 'mp3' : '',
      duration: (episode.realTo - episode.realFrom) / 1000
    })
  });
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

<h1>Archívum { slug }</h1>

<div class="archive">
  {#each newEpisodes as episode}
    <Episode {...episode}></Episode>
	{/each}
</div>
