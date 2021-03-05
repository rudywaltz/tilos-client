<script>
import { episodeMapper } from '../helpers';
import Episode from './Episode.svelte';
import { onMount } from 'svelte';
import {
  getYear,
  getQuarter,
  setQuarter,
  endOfQuarter,
  startOfQuarter,
  isSameQuarter,
  isAfter,
  endOfDay,
  getTime,
} from 'date-fns';

export let year;
export let quarter;
export let firstShowDate;
export let lastShowDate;
export let id;
export let episodes;
let archiveShows = [];

year = Number(year) || new Date().getFullYear();
quarter = Number(quarter) || getQuarter(new Date());
$: episodes = episodeMapper(archiveShows);

function calculateQuarter() {
  let firstDayOfQuarter = setQuarter(new Date(year, 0, 1), quarter);
  if (isAfter(firstShowDate, firstDayOfQuarter)) {
    if (!isSameQuarter(firstDayOfQuarter, firstShowDate)) {
      quarter = getQuarter(firstShowDate);
      year = getYear(firstShowDate);
    }

    firstDayOfQuarter = firstShowDate;
  }

  let lastDayOfQuarter = endOfQuarter(firstDayOfQuarter);

  if (isAfter(lastDayOfQuarter, lastShowDate)) {
    if (!isSameQuarter(lastDayOfQuarter, lastShowDate)) {
      quarter = getQuarter(lastShowDate);
      year = getYear(lastShowDate);
    }

    lastDayOfQuarter = endOfDay(lastShowDate);
    firstDayOfQuarter = startOfQuarter(lastDayOfQuarter);
  }

  return { firstDayOfQuarter, lastDayOfQuarter };
}

function quarterDecrase() {
  if (quarter === 1) {
    quarter = 4;
    year--;
  } else {
    quarter--;
  }
}

function quarterIncrase() {
  if (quarter === 4) {
    quarter = 1;
    year = year + 1;
  } else {
    quarter++;
  }
}

async function prev(event) {
  event.preventDefault();
  quarterDecrase();
  archiveShows = await load();
}

async function next(event) {
  event.preventDefault();
  quarterIncrase();
  archiveShows = await load();
}

async function load() {
  const { firstDayOfQuarter, lastDayOfQuarter } = calculateQuarter();
  const response = await fetch(
    `/api/v1/show/${id}/episodes?start=${getTime(
      firstDayOfQuarter
    )}&end=${getTime(lastDayOfQuarter)}`
  );
  const res = await response.json();
  return res;
}

onMount(async function intialArchiveShows() {
  archiveShows = await load();
});
</script>

<h2>Archívum:</h2>
<button type="button" on:click="{prev}">Prev</button>
<button type="button" on:click="{next}">next</button>
{#each episodes as episode}
  <Episode {...episode} />
{:else}Nincs elérhető adás{/each}
