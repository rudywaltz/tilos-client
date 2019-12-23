<script>
  import { onMount } from 'svelte';

  import { getQuarter, setQuarter, endOfQuarter, startOfQuarter, isAfter, endOfDay, getTime, format } from 'date-fns';

  export let year;
  export let quarter;
  export let firstShowDate;
  export let lastShowDate;
  export let id;

  let archiveShows = [];
  let archiveShowsTemp = [];
  year = year || new Date().getFullYear();
  quarter = quarter || getQuarter(new Date());

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

  const quarterDecrase = (localQuarter, localYear) => {
    if (localQuarter === 1) {
      localQuarter = 4;
      localYear--;
    } else {
      localQuarter--;
    }

    return { localQuarter, localYear };
  };

  const onPrevPrefetch = async () => {
    const { localQuarter, localYear } = quarterDecrase(quarter, year);

    archiveShowsTemp = await load(localQuarter, localYear);
  };

  const prev = async (event) => {
    event.preventDefault();
    const { localQuarter, localYear } = quarterDecrase(quarter, year);
    quarter = localQuarter;
    year = localYear;

    if (archiveShowsTemp.length) {
      archiveShows =  archiveShowsTemp;
      archiveShowsTemp = [];
    } else {
      archiveShows = await load();
    }

  };

  const next = async (event) => {
    event.preventDefault();

    if (quarter === 4) {
      quarter = 1;
      year = year + 1;
    } else {
      quarter++;
    }
    archiveShows = await load();
  };


  const load = async (localQuarter = quarter, localYear = year) => {
    const { firstDayOfQuarter, lastDayOfQuarter } = calculateQuarter(localQuarter, localYear);
    const response =  await fetch(`/api/v1/show/${id}/episodes?start=${getTime(firstDayOfQuarter)}&end=${getTime(lastDayOfQuarter)}`);
    const res =  await response.json();
    return res;
  };

  onMount(async () => {
    archiveShows = await load();
    console.log(archiveShows);
});


</script>
<h2>Archívum:</h2>
<button type="button" href="" on:click={prev} on:mouseenter={onPrevPrefetch}>Prev</button>
<button type="button" href="" on:click={next}>next</button>
{#each archiveShows as archive}
  <hr>
  <h4>{format(archive.realFrom, 'yyyy-MM-dd HH:mm')} - {format(archive.realTo, 'yyyy-MM-dd HH:mm')}</h4>
  <h4>{archive.text ? archive.text.title : '--' }</h4>
  <h4>{archive.m3uUrl}</h4>
  <a href="{archive.url}">URL</a>
{/each}
