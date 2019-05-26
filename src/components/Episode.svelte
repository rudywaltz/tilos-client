<script>
  import { format } from '../helpers';
  import { playlist } from './stores';
  export let name;
  export let mp3;
  export let duration;
  export let text;


  $: isInPlaylist = !!$playlist.find(song => song.url === mp3);

  const playlistToggle = () => {
    if (isInPlaylist) {
      $playlist = $playlist.filter(song => song.url !== mp3);
    } else {
      $playlist = [...$playlist, {
        title: name,
        url: mp3,
        duration: duration
      }];
    }
  }
</script>

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
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  .archive__item:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
</style>

<div class="episode archive__item">
  <h2 class="episode__title">{name}</h2>
  <time class="episode__duration">{format(duration)}</time>
  <p class="episode__diary">{text}</p>
  <code class="episode__link">{mp3}</code>
  <button type="submit" on:click={playlistToggle} class="episode__add_playlist">{isInPlaylist ? 'Remove from Playlist' : 'Add to Playlist'}</button>
</div>
