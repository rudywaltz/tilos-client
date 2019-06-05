<script context="module">
  import { isValid, startOfDay, endOfDay, getTime } from 'date-fns';
  const { getZonedTime, findTimeZone, getUnixTime } = require('timezone-support');


  export async function preload(page, session) {
    const { slug } = page.params;
    let date = new Date(slug); //timezone
    const budapest = findTimeZone('Europe/Budapest');
    console.log('fff', getUnixTime(getZonedTime(date, budapest)));
    date = isValid(date) ? getUnixTime(getZonedTime(date, budapest)) : getUnixTime(getZonedTime(new Date(), 'budapest'));
    console.log(date);
    const dayStart  = getTime(startOfDay(date));
    const dayEnd = getTime(endOfDay(date));
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
