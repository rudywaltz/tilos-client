<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  main {
    position: relative;
    background-color: white;
    margin: 0 auto;
  }
</style>

<script>
  import Nav from '../components/Nav.svelte';
  import Player from '../components/Player.svelte';
  import Playlist from '../components/Playlist.svelte';

  export let segment;
</script>

<Nav {segment} />

<main>


  <slot />
</main>

<Player>
  <Playlist />
</Player>
