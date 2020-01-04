<script>
  import { onMount, onDestroy } from 'svelte';
  import { format } from '../helpers';
  import { Howl, Howler } from 'howler';
  import { playlist, song } from './stores';

  let duration =  0;
  let time = 0;
  let playing = false;
  let volume = .5;
  let isPlaylistVisible = false;
  let currentSound = null;
  let showVolumeBar = false;
  let unsubscribe = () => { };

  $: percent = (time / duration * 100).toFixed(2) || 0;

  onMount(() => {
    unsubscribe = playlist.subscribe(value =>  {
      if (Object.keys($song).length || !value.length) return;

      $song =  value.shift();
      playlist.set(value);
      currentSound = createCurrentSong();
    });

    Howler.volume(volume);
    loadNewSong();
    currentSound = createCurrentSong();
  });

  onDestroy(unsubscribe);

  const createCurrentSong = () => {
    const playing1 = playing;
    return new Howl({
      src: [$song.url],
      xhrWithCredentials: true,
      preload: true,
      html5: false,
      pool: 0,
      onload: () => {
        duration = currentSound.duration();
        time = $song.time;

        if(time) {
          currentSound.seek(time);
        }

        if (playing1) {
          playSound();
        }
      },
      onend: () => {
        $song = {};
        if ($playlist.length) {
          loadNewSong();
        } else {
          resetSongStatus();
        }
      }
    });
  };

  const resetSongStatus = () => {
    $song = {};
    currentSound = null;
    duration =  0;
    time = 0;
    playing = false;
  };

  const loadNewSong = () => {
    if (Object.keys($song).length || !$playlist.length) {
      return;
    }

    nextFromPlaylist();
  };

  const nextSong = () => {
    currentSound.unload();

    if (!$playlist.length) {
      resetSongStatus();
      return;
    }

    nextFromPlaylist();

  };

  const nextFromPlaylist = () => {
    $song = $playlist.shift();
    $playlist = $playlist; //TODO: nicer solution
    currentSound = createCurrentSong();
  };
  const toggleSound = () => playing ? pauseSound() : playSound();

  const playSound = () => {
    currentSound.play();
    playing = true;

    const pollingSongData = setInterval(() => {
      if (!playing) {
        time = 0;
        clearInterval(pollingSongData);
        return;
      }

      time = currentSound.seek();
    }, 200);
  };

  const toggleLive = () => {
    if (playing) {
      playing = false;
      currentSound.unload();
      return;
    }

    $playlist = [$song, ...$playlist];
    currentSound.unload();
    $song = {
      title: 'live 128kbps',
      url: 'http://stream.tilos.hu:8000/tilos_128.mp3'
    };
    playing = true;
    currentSound = createCurrentSong();
  };

  const pauseSound = () => {
    currentSound.pause();
    playing = false;
  };

  const fastForward = () => currentSound.seek(currentSound.seek() + 30);
  const backward = () => {
    const currentPosition = currentSound.seek();
    const newPostition = currentPosition - 10 > 0 ? currentPosition - 10 : 0;
    currentSound.seek(newPostition);
  };

  const setVolume = event => {
    if (event.type === 'mousemove' && event.buttons !== 1) {
      return;
    }

    const target = event.target.getBoundingClientRect();
    const position =  target.bottom - event.clientY;
    volume  = position / target.height;
    Howler.volume(volume);
  };

  const seekWithBar = event => {
    if (event.type === 'mousemove' && event.buttons !== 1 || !playing) {
      return;
    }

    const target = event.target.getBoundingClientRect();
    const position = event.pageX - target.left;

    const rate  = position / target.width;
    currentSound.seek(rate * duration);
  };

  const setCurrentData = () => {
    if (!Object.keys($song).length) {
      localStorage.removeItem('tilosStoreSong');
      return;
    }

    const fullSong = Object.assign({}, $song, { time });
    localStorage.setItem('tilosStoreSong', JSON.stringify(fullSong));
  };

  const togglePlaylist = () => isPlaylistVisible = !isPlaylistVisible;
</script>

<style>
#player {
  background: #ccc;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
}
  .player {
    display: flex;
    align-items: center;
  }

.player__control {
  padding: 5px 16px;
  flex-shrink: 0;
}
  .player__button {
    padding: 16px 8px;
    white-space: nowrap;
  }
  .player__song {
    flex-basis: 100%;
    padding: 5px 16px;
  }

  .player__prog {
    display: flex;
    align-items: center;
  }

  .player__current,
  .player__duration {
    white-space: nowrap;
  }

  .player__song_control {
    position: relative;
    user-select: none;
  }

  .progress {
    background: #aaa;
    height: 16px;
    flex-basis: 100%;
    margin: 0 8px;
  }

  .progress__bar {
    background: #444;
    height: 100%;
    pointer-events: none;
    width: 0;
  }

  .volume__ghost {
    bottom: 0;
    height: 0;
    position: absolute;
    transition: height .4s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: 60px;
  }

  .volume__ghost--visible {
    height: 240px;
  }

  .volume {
    background: #ddd;
    bottom: 20px;
    left: 20px;
    right: 20px;
    position: absolute;
    top: 20px;
    width: 20px;
  }

  .volume__bar {
    background: steelblue;
    bottom: 0;
    pointer-events: none;
    position: absolute;
    width: 20px;
  }

</style>


<div id="player">
  <div class="player">
    <div class="player__control">
      <button type="button" class="player__button player__backward mobile-hidden" on:click={backward} disabled={ !duration }>Backward</button>
      <button type="button" class="player__button" on:click={toggleLive}>LIVE</button>
      <button type="button" class="player__button player__play" on:click={toggleSound} disabled={!duration}>{ playing ? 'Pause' : 'Play' }</button>
      <button type="button" class="player__button player__fast_forward mobile-hidden" on:click={fastForward} disabled={ !duration }>Forward</button>
      <button type="button" class="player__button player__fast_next mobile-hidden" on:click={nextSong} disabled={ !duration }>Next Song</button>
    </div>
    <div class="player__song">
      <div class="player__title">{ $song.url ? $song.title : 'No sound selected' }</div>
      <div class="player__prog mobile-hidden">
        <div class="player__current">{ $song.url ? format(time) : format() }</div>
        <div class="progress" on:click={seekWithBar}  on:mousemove={seekWithBar}>
          <div class="progress__bar" style="width:{ percent }%"></div>
        </div>
        <div class="player__duration mobile-hidden">{ $song.url ? format(duration) : format() }</div>
      </div>
    </div>
    <div class="player__song_control mobile-hidden" on:mouseenter={ () => { showVolumeBar = true;} }>
      <button type="button" class="player__button">Volume</button>
      <div class="volume__ghost" class:volume__ghost--visible={showVolumeBar} on:mouseleave={ ()=> showVolumeBar = false }>
        <div class="volume" id="volume" on:click={setVolume} on:mousemove={setVolume}>
          <div class="volume__bar" style="height: { volume * 100 }%"></div>
        </div>
      </div>
    </div>
    <div>
      <button type="button" on:click={togglePlaylist} class="player__toggle_playlist player__button">{ isPlaylistVisible ? 'Close' : 'Open'} Playlist</button>
    </div>
  </div>
  <div class="player__playlist">
    {#if isPlaylistVisible}
      <slot></slot>
    {/if}
  </div>
</div>

<svelte:window on:beforeunload={setCurrentData} />
