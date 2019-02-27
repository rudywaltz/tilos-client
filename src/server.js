import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '../__sapper__/server.js';
import { Store } from 'svelte/store.js';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      store: request => {
        return new Store({
          development: dev,
          song: {
            url: '/jezusesajelzoraketa.mp3'
          }
        })
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
