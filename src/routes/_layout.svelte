
<script>
  import Nav from '../components/Nav.svelte';
  import Player from '../components/Player.svelte';
  import Playlist from '../components/Playlist.svelte';

  export let segment;
</script>

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

<Nav {segment}/>

<main>
	<slot></slot>
</main>
<Player>
  <Playlist />
</Player>
