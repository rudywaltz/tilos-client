import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import https from 'https';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const proxy = (req, response, next) => {
  if(req.method === 'GET' && req.url.startsWith('/api/')) {
    https.get(`https://tilos.hu${req.url}`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        response.end(data)
      });

    }).on('socket', (socket) => {
      socket.emit('agentRemove');
    });

  } else {
    next();
  }
}

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),

    proxy,
    sapper.middleware({
      session: (req, res) => ({
        development: dev,
      })
  }))
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });




// // src: ['https://archive.tilos.hu/mp3/tilos-20130820-150000-163000.mp3'],
// // src: ['http://stream.tilos.hu:8000/tilos_128.mp3'],

// polka()
//   .use(
//     compression({ threshold: 0 }),
//     sirv('static', { dev }),
//     sapper.middleware(
//       // {
//       //   session: (request, response) => ({
//       //     development: dev,
//       //     // song: {
//       //     //   title: 'Gongs',
//       //     //   url: '/gongs.mp3',
//       //     //   duration: 22
//       //     // },
//       //     song: {},
//       //     playlist: [],
//       //     playlist: [{
//       //       title: 'Gongs',
//       //       url: '/gongs.mp3',
//       //       duration: 22
//       //     },
//       //     {
//       //       title: 'Jézus és a jelzőrakéta',
//       //       url: '/jezusesajelzoraketa.mp3',
//       //       duration: (60 * 60) + (15 * 60) + 13
//       //     }]
//       //   })
//       // }
//   ))
//   .listen(PORT, err => {
//     if (err) console.log('error', err);
//   });
