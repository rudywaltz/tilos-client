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
    let latestNews = [];
    let collectedEpisodesList = [];
    try {
      const [recommended, news, collectedEpisodes] = await Promise.all([
        this.fetch('/api/v1/episode/lastWeek'),
        this.fetch('/api/v1/text/news/current'),
        this.fetch('/api/v1/tag/tematikusnap'),
      ]);
      recommendedList = await recommended.json();
      latestNews = await news.json();
      collectedEpisodesList = await collectedEpisodes.json();
    } catch (e) {
      console.log('error in Fetch', e);
    }

    return {
      recommendedList,
      latestNews,
      collectedEpisodesList,
    };
  }
</script>

<script>
  import { playlist, song } from '../components/stores';
  import { episodeMapper } from '../helpers';
  import Episode from '../components/Episode.svelte';

  export let latestNews;
  export let collectedEpisodesList;
  export let recommendedList;
  const formattedRecommendedList = episodeMapper(recommendedList);

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
<h2>Ajánló</h2>
<div class="wrap">
  {#each formattedRecommendedList as episode}
    <Episode {...episode} />
  {:else}Nincs elérhető adás{/each}
</div>

<h2>Hírek</h2>
<ul>

  {#each latestNews as news}
    <li>
      <h4>
        <a href="/hirek/{news.id}" rel="prefetch">{news.title}</a>
      </h4>
      {@html news.leadFormatted}
    </li>
  {:else}Nincs elérhető adás{/each}
</ul>

<h2>Összeszedtük neked</h2>
<ul>
  {#each collectedEpisodesList.tagged as episode}
    <li>
      <b>{episode.showName}:</b>
      {episode.title}
    </li>
  {:else}
    <li>Nincs elérhető ajánlás</li>
  {/each}
</ul>
