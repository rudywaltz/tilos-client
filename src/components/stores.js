import { writable } from 'svelte/store';

export const playlist = writable([
  {
    title: 'Gongs',
    url: '/gongs.mp3',
    duration: 22
  },
  {
    title: 'Jézus és a jelzőrakéta',
    url: '/jezusesajelzoraketa.mp3',
    duration: (60 * 60) + (15 * 60) + 13
  }
]);
