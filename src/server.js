import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import https from 'https';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
import { transform } from 'camaro';

const template = [
  'rss/channel',
  {
    title: 'title',
    description: 'description',
    shows: [
      'item',
      {
        title: 'title',
        sub: 'itunes:subtitle',
        image: 'itunes:image/@href',
      },
    ],
  },
];

const qqq = `<rss><channel>
<title>gombapresszó</title>
<link>http://www.gombapresszo.hu</link>
<description>Minden héten.</description>
<generator>Feeder 3 3.7(3248); Mac OS X Version 10.14.4 (Build 18E227) http://reinventedsoftware.com/feeder/</generator>
<docs>http://blogs.law.harvard.edu/tech/rss</docs>
<language>hu</language>
<pubDate>Mon, 07 Oct 2019 13:58:30 +0200</pubDate>
<lastBuildDate>Mon, 07 Oct 2019 13:58:30 +0200</lastBuildDate>
<category>Comedy</category>
<category>Natural Sciences</category>
<image>
    <url>http://gombapresszo.hu/podcast/gombapresszo_image_144.jpg</url>
    <title>gombapresszó</title>
    <link>http://www.gombapresszo.hu</link>
    <width>144</width>
    <height>144</height>
</image>
<itunes:author>tomi és tibi</itunes:author>
<itunes:summary>Minden héten.</itunes:summary>
<itunes:image href="http://gombapresszo.hu/podcast/gombapresszo_image.jpg" />
<itunes:owner>
    <itunes:name>tomi</itunes:name>
    <itunes:email>tamas.rakusz@gmail.com</itunes:email>
</itunes:owner>
<itunes:block>no</itunes:block>
<itunes:category text="Comedy" />
<itunes:category text="Science" />
<itunes:type>episodic</itunes:type>
<atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="http://feeds.feedburner.com/gombapresszo" /><feedburner:info uri="gombapresszo" /><atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="hub" href="http://pubsubhubbub.appspot.com/" /><feedburner:emailServiceId>gombapresszo</feedburner:emailServiceId><feedburner:feedburnerHostname>https://feedburner.google.com</feedburner:feedburnerHostname><feedburner:feedFlare href="https://add.my.yahoo.com/rss?url=http%3A%2F%2Ffeeds.feedburner.com%2Fgombapresszo" src="http://us.i1.yimg.com/us.yimg.com/i/us/my/addtomyyahoo4.gif">Subscribe with My Yahoo!</feedburner:feedFlare><feedburner:feedFlare href="http://feedly.com/#subscription/feed/http://feeds.feedburner.com/gombapresszo" src="http://s3.feedly.com/feedburner/feedly.png">Subscribe with Feedly</feedburner:feedFlare><feedburner:feedFlare href="https://www.subtome.com/#/subscribe?feeds=http%3A%2F%2Ffeeds.feedburner.com%2Fgombapresszo" src="http://www.subtome.com/subtome-feedburner.png">Subscribe with SubToMe</feedburner:feedFlare><feedburner:feedFlare href="http://www.bloglines.com/sub/http://feeds.feedburner.com/gombapresszo" src="http://www.bloglines.com/images/sub_modern11.gif">Subscribe with Bloglines</feedburner:feedFlare><feedburner:feedFlare href="http://www.netvibes.com/subscribe.php?url=http%3A%2F%2Ffeeds.feedburner.com%2Fgombapresszo" src="//www.netvibes.com/img/add2netvibes.gif">Subscribe with Netvibes</feedburner:feedFlare><feedburner:feedFlare href="http://www.bitty.com/manual/?contenttype=rssfeed&amp;contentvalue=http%3A%2F%2Ffeeds.feedburner.com%2Fgombapresszo" src="http://www.bitty.com/img/bittychicklet_91x17.gif">Subscribe with Bitty Browser</feedburner:feedFlare><feedburner:feedFlare href="http://www.dailyrotation.com/index.php?feed=http%3A%2F%2Ffeeds.feedburner.com%2Fgombapresszo" src="http://www.dailyrotation.com/rss-dr2.gif">Subscribe with Daily Rotation</feedburner:feedFlare><item>
    <title>szociológia, lyukasóra, Rodecaster Pro</title>
    <link>http://feedproxy.google.com/~r/gombapresszo/~3/zpqZ25Otlms/20200629_szociologia_lyukasora_rodecasterpro.mp3</link>
    <description><![CDATA[Papp tanár úrnak két hét alatt sem sikerült összeraknia az órát a választott témájából. Nagyon akarta, nyögés lett a vége. Legközelebb jobban sikerül.]]></description>
    <pubDate>Mon, 29 Jun 2020 13:29:11 +0200</pubDate>
    <category>Comedy</category>

    <guid isPermaLink="false">http://gombapresszo.hu/podcast/20200629_szociologia_lyukasora_rodecasterpro.mp3</guid>
    <itunes:author>gombapresszó</itunes:author>
    <itunes:subtitle>Papp tanár úrnak két hét alatt sem sikerült összeraknia az órát a választott témájából. Nagyon akarta, nyögés lett a vége. Legközelebb jobban sikerül.</itunes:subtitle>
    <itunes:image href="http://gombapresszo.hu/podcast/rode.jpg" />
    <itunes:duration>2:47:13</itunes:duration>
    <itunes:episodeType>full</itunes:episodeType>
<feedburner:origLink>http://gombapresszo.hu/podcast/20200629_szociologia_lyukasora_rodecasterpro.mp3</feedburner:origLink><enclosure url="http://feedproxy.google.com/~r/gombapresszo/~5/zpqZ25Otlms/20200629_szociologia_lyukasora_rodecasterpro.mp3" length="87980199" type="audio/mpeg" /><feedburner:origEnclosureLink>http://gombapresszo.hu/podcast/20200629_szociologia_lyukasora_rodecasterpro.mp3</feedburner:origEnclosureLink>

</item>
<item>
    <title>Semmelweis Ignác, Egyiptom, rasszizmus</title>
    <link>http://feedproxy.google.com/~r/gombapresszo/~3/ZknPCC4AJjA/20200622_semmelweis_egyiptom_rasszizmus.mp3</link>
    <description><![CDATA[Kicsit megszaladt a helyreigazítás hossza Semmelweis Ignác ügyében, ezért lett ilyen hosszú az adás, de ez a legkevesebb, amit megérdemel.]]></description>
    <pubDate>Mon, 22 Jun 2020 13:29:11 +0200</pubDate>
    <category>Comedy</category>

    <guid isPermaLink="false">http://gombapresszo.hu/podcast/20200622_semmelweis_egyiptom_rasszizmus.mp3</guid>
    <itunes:author>gombapresszó</itunes:author>
    <itunes:subtitle>Kicsit megszaladt a helyreigazítás hossza Semmelweis Ignác ügyében, ezért lett ilyen hosszú az adás, de ez a legkevesebb, amit megérdemel.</itunes:subtitle>
    <itunes:image href="http://gombapresszo.hu/podcast/ignac.jpg" />
    <itunes:duration>3:16:04</itunes:duration>
    <itunes:episodeType>full</itunes:episodeType>
<feedburner:origLink>http://gombapresszo.hu/podcast/20200622_semmelweis_egyiptom_rasszizmus.mp3</feedburner:origLink><enclosure url="http://feedproxy.google.com/~r/gombapresszo/~5/ZknPCC4AJjA/20200622_semmelweis_egyiptom_rasszizmus.mp3" length="87980199" type="audio/mpeg" /><feedburner:origEnclosureLink>http://gombapresszo.hu/podcast/20200622_semmelweis_egyiptom_rasszizmus.mp3</feedburner:origEnclosureLink>
</item>
</channel>
</rss>
`;

async function proxy(req, response, next) {
  if (req.method === 'GET' && req.url.startsWith('/api/')) {
    const result = await transform(qqq, template);
    console.log('res', JSON.stringify(result));
    return;
    https
      // .get(`https://tilos.hu${req.url}`, function callback(res) {
      .get(
        `https://feeds.feedburner.com/vendegloavilagvegen`,
        function callback(res) {
          let data = '';

          res.on('data', function (chunk) {
            data += chunk;
          });

          res.on('end', async function () {
            // console.log(data);

            // const result = await toJson(qqq).catch
            const result = await transform(data, template);
            console.log('res', result);

            // const prettyStr = await prettyPrint(data, { indentSize: 4 });
            // console.log('prett', prettyStr);
            response.end(data);
          });
        }
      )
      .on('socket', function (socket) {
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
      session: function () {
        return {
          development: dev,
        };
      },
    })
  )
  .listen(PORT, function (err) {
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
