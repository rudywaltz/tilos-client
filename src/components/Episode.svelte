<style>
  .archive__item {
    background: #fff;
    display: flex;
    flex-direction: column;
    flex-basis: 300px;
    flex-shrink: 0;
    flex-grow: 1;
    margin: 1rem;
    padding: calc(1rem - 1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .archive__item:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
</style>

<script>
  import { format } from '../helpers';
  import { playlist, song, hiddenShows } from './stores';
  import { fade } from 'svelte/transition';
  export let name;
  export let alias;
  export let mp3;
  export let duration;
  export let text;
  export let showId;
  export let inThePast;

  $: isInPlaylist =
    !!$playlist.find((song) => song.url === mp3) || $song.url === mp3;
  $: hide = $hiddenShows.indexOf(showId) > -1;

  const playlistToggle = () => {
    if (isInPlaylist) {
      if ($song.url === mp3) {
        $song = {};
      }

      $playlist = $playlist.filter((song) => song.url !== mp3);
      return;
    }

    $playlist = [
      ...$playlist,
      {
        title: name,
        url: mp3,
        duration: duration,
      },
    ];
  };

  const hideArtist = () => {
    $hiddenShows = [...$hiddenShows, showId];
  };
</script>

{#if !hide}
  <div class="episode archive__item" transition:fade>
    <h2 class="episode__title">
      <a rel="prefetch" href="shows/{alias}">{name}</a>
    </h2>
    <time class="episode__duration">{format(duration)}</time>
    <p class="episode__diary">{text}</p>
    <code class="episode__link">{mp3}</code>
    <br />
    <button
      type="button"
      on:click="{playlistToggle}"
      class="episode__add_playlist"
      disabled="{!inThePast}"
    >
      {isInPlaylist ? 'Remove from Playlist' : 'Add to Playlist'}
    </button>
    <br />
    <button type="button" on:click="{hideArtist}" class="episode__hide_artist">
      Hide this Artist
    </button>
  </div>
{/if}
