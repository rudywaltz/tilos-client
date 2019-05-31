<script>
  import { hiddenShows } from './stores';

  export let id;
  export let name;
  export let definition;
  export let type;
  export let status;
  $: isHidden = $hiddenShows.indexOf(id) > -1;

  const toggleHiddenShow = () => {
      if (isHidden) {
          $hiddenShows = $hiddenShows.filter(showId => showId !== id);
      } else {
        $hiddenShows = [...$hiddenShows, id];
      }
  }
</script>

<div class:unwanted={isHidden}>
  <h2>{name}</h2>
  <div>{type} | {status}</div>
  <p>{definition}</p>
</div>
<button type="button" on:click={toggleHiddenShow}> {isHidden ? 'Uhhide' : 'Hide' }</button>
<hr>


<style>
  .unwanted {
    opacity: .4;
  }

</style>
