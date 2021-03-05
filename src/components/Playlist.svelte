<style>
.playlist {
  border-top: 1px solid #dedede;
  list-style: none;
  margin: 0;
  padding: 0;
}

.song {
  display: inline-block;
  padding: 0 16px;
}

.song__title {
  margin: 0;
}
</style>

<script>
import { format } from '../helpers';
import { playlist } from './stores';

function removeAllSongs() {
  $playlist = [];
}

function removeSong(songUrl) {
  $playlist = $playlist.filter(function (song) {
    return song.url !== songUrl;
  });
}

function setCurrentData() {
  // TODO: tests
  if (!$playlist.length) {
    localStorage.removeItem('tilosStorePlaylist');
    return;
  }
  localStorage.setItem('tilosStorePlaylist', JSON.stringify($playlist));
}
</script>

<button type="button" class="playlist__clear" on:click="{removeAllSongs}">
  Clear
</button>
<ul class="playlist">
  {#each $playlist as song (song.url)}
    <li class="song" draggable="true">
      <h3 class="song__title">{song.title}</h3>
      {song.url}
      <span class="song__duration">{format(song.duration)}</span>
      <button
        type="button"
        class="song__clear"
        on:click="{function () {
          removeSong(song.url);
        }}">
        Clear
      </button>
    </li>
  {:else}
    <li>Choose one song</li>
  {/each}
</ul>
<svelte:window on:beforeunload="{setCurrentData}" />
