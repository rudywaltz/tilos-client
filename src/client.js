import * as sapper from '@sapper/app';
import { playlist, song, hiddenShows } from './components/stores';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from './use-local-storage.js';

loadFromLocalStorage(song, 'tilosStoreSong');
loadFromLocalStorage(playlist, 'tilosStorePlaylist');
loadFromLocalStorage(hiddenShows, 'tilosStorehiddenShows');

saveToLocalStorage(playlist, 'tilosStorePlaylist');
saveToLocalStorage(hiddenShows, 'tilosStorehiddenShows');

sapper.start({
  target: document.querySelector('#tilos-client'),
});
