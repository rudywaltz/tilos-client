<style>
.unwanted {
  opacity: 0.4;
}
</style>

<script>
import { hiddenShows } from './stores';

export let id;
export let name;
export let definition;
export let type;
export let status;
export let alias;

$: isHidden = $hiddenShows.indexOf(id) > -1;

function toggleHiddenShow() {
  if (isHidden) {
    $hiddenShows = $hiddenShows.filter(function (showId) {
      return showId !== id;
    });
  } else {
    $hiddenShows = [...$hiddenShows, id];
  }
}
</script>

<div class:unwanted="{isHidden}">
  <h2><a rel="prefetch" href="shows/{alias}">{name}</a></h2>
  <div>{type} | {status}</div>
  <p>{definition}</p>
</div>
<button type="button" on:click="{toggleHiddenShow}">
  {isHidden ? 'Megjelenítés' : 'Elrejtés'}
</button>
<hr />
