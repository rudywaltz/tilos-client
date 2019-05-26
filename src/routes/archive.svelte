<script context="module">
	export async function preload(page, session) {
    const { query } =  page;
    const start = query.start || 1525903200000;
    const end = query.end || 1525989600000;
    let episodes = [];

    try {
      const res = await this.fetch(`https://tilos.hu/api/v1/episode?start=${start}&end=${end}`, {
			  credentials: 'include'
      });
    episodes = await res.json();
    } catch(e) {
      console.log('error in Fetch', e);
    }
		return { episodes };
  }
</script>

<script>
  import Episode from '../components/Episode.svelte';
  import { format } from '../helpers';
  export let episodes;
  // console.log(episodes);
  let newEpisodes = [];

  episodes.forEach(episode => {
    newEpisodes.push({
      name: episode.show.name,
      showId: episode.show.id,
      text: episode.text ? episode.text.title : '------',
      mp3: episode.m3uUrl.slice(0, -3) + 'mp3',
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

<h1>Archívum</h1>

<div class="archive">
  {#each newEpisodes as episode}
    <Episode {...episode}></Episode>
	{/each}
</div>
