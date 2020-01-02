<script>
  import Episode from './Episode.svelte';
  import { onMount } from 'svelte';
  import { getQuarter, setQuarter, endOfQuarter, startOfQuarter, isAfter, endOfDay, getTime } from 'date-fns';

  export let year;
  export let quarter;
  export let firstShowDate;
  export let lastShowDate;
  export let id;
  export let episodes;

  let archiveShows = [];
  year = year || new Date().getFullYear();
  quarter = quarter || getQuarter(new Date());


  $: episodes = archiveShows.map(episode => {
    return {
      name: episode.show.name,
      showId: episode.show.id,
      inThePast: episode.inThePast,
      text: episode.text ? episode.text.title : '------',
      mp3: episode.m3uUrl ? episode.m3uUrl.slice(0, -3) + 'mp3' : '',
      duration: (episode.realTo - episode.realFrom) / 1000
    };
  });


  const calculateQuarter = (localQuarter, localYear) => {
    let firstDayOfQuarter = setQuarter(new Date(localYear, 0, 1), localQuarter);
    if (isAfter(firstShowDate, firstDayOfQuarter)) {
      firstDayOfQuarter = firstShowDate;
    }

    let lastDayOfQuarter = endOfQuarter(firstDayOfQuarter);

    if (isAfter(lastDayOfQuarter, lastShowDate)) {
      lastDayOfQuarter = endOfDay(lastShowDate);
      firstDayOfQuarter = startOfQuarter(lastDayOfQuarter);
    }

    return { firstDayOfQuarter, lastDayOfQuarter };
  };

  const quarterDecrase = () => {
    if (quarter === 1) {
      quarter = 4;
      year--;
    } else {
      quarter--;
    }
  };

  const quarterIncrase = () => {
    if (quarter === 4) {
      quarter = 1;
      year = year + 1;
    } else {
      quarter++;
    }
  };

  const prev = async (event) => {
    event.preventDefault();
    quarterDecrase();
    archiveShows = await load();
  };

  const next = async (event) => {
    event.preventDefault();
    quarterIncrase();
    archiveShows = await load();
  };


  const load = async () => {
    const { firstDayOfQuarter, lastDayOfQuarter } = calculateQuarter(quarter, year);
    const response =  await fetch(`/api/v1/show/${id}/episodes?start=${getTime(firstDayOfQuarter)}&end=${getTime(lastDayOfQuarter)}`);
    const res =  await response.json();
    return res;
  };

  onMount(async () => {
    archiveShows = await load();
});


</script>
<h2>Archívum:</h2>
<button type="button" href="" on:click={prev}>Prev</button>
<button type="button" href="" on:click={next}>next</button>

{#each episodes as episode}
  <Episode {...episode}></Episode>
{:else}
  Nincs elérhető adás
{/each}
