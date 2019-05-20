import * as sapper from '@sapper/app';
import { playlist, song } from './components/stores';
import { loadFromLocalStorage, saveToLocalStorage } from './use-local-storage.js';


loadFromLocalStorage(song, 'tilosStoreSong');
loadFromLocalStorage(playlist, 'tilosStorePlaylist');
saveToLocalStorage(playlist, 'tilosStorePlaylist');


sapper.start({
	target: document.querySelector('#tilos-client')
});




// import * as sapper from '@sapper/app';

// sapper.start({
//   target: document.querySelector('#tilos-client')
//   // store: dataFromServer => {
//   //   const song =  JSON.parse(localStorage.getItem('tilosStoreSong'))
//   //     || dataFromServer.song;
//   //   const playlist = JSON.parse(localStorage.getItem('tilosStorePlaylist'))
//   //     || dataFromServer.playlist;

//   //   const userSetup = Object.assign({}, dataFromServer, { song, playlist });

//   //   const store = new Store(userSetup);

//   //   if (dataFromServer.development) {
//   //     window.store = store;
//   //   }

//   //   return store;
//   // }
// });
