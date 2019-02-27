import * as sapper from '../__sapper__/client.js';
import { Store } from 'svelte/store.js';


sapper.start({
  target: document.querySelector('#tilos-client'),
  store: data => {
    const store = new Store(data);
    window.store = store;
    return store;
  }
});
