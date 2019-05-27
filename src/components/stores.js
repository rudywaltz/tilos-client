import { writable } from 'svelte/store';


export let song = writable({});
export let playlist = writable([]);
export let hiddenShows = writable([]);
