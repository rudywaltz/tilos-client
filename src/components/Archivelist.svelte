<script>
  import { onMount } from 'svelte';

  import { getQuarter, setQuarter, endOfQuarter, startOfQuarter, isAfter, endOfDay, getTime } from 'date-fns';

  export let year
  export let quarter
  export let firstShowDate
  export let lastShowDate
  export let id

  let archiveShows = []
  year = year || new Date().getFullYear();
  quarter = quarter || getQuarter(new Date());


    let firstDayOfQuarter = setQuarter(new Date(year, 0, 1), quarter);
    if (isAfter(firstShowDate, firstDayOfQuarter)) {
        firstDayOfQuarter = firstShowDate;
    }

    let lastDayOfQuarter = endOfQuarter(firstDayOfQuarter);

    if (isAfter(lastDayOfQuarter, lastShowDate)) {
      lastDayOfQuarter = endOfDay(lastShowDate);
      firstDayOfQuarter = startOfQuarter(lastDayOfQuarter);
    }

    const load = async () => {
     const response =  await fetch(`/api/v1/show/${id}/episodes?start=${getTime(firstDayOfQuarter)}&end=${getTime(lastDayOfQuarter)}`);
     const res =  await response.json();
     return res;
    }

    onMount(async () => {
      archiveShows = await load();
  });


  </script>
  <h2>Archívum:</h2>
{#each archiveShows as archive}
  <hr>
  <h4>{archive.realFrom} - {archive.realTo}</h4>
  <h4>{archive.text ? archive.text.title : '--' }</h4>
  <h4>{archive.m3uUrl}</h4>
  <a href="{archive.url}">URL</a>
{/each}
