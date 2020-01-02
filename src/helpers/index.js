const pad = num => num < 10 ? '0' + num : num;

export const format = time => {
  if (isNaN(time)) return '--:--:--';
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.ceil((time % 60));
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const normailezeString = str => str.length ?
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() :
  str;

export const episodeMapper = archiveShows => archiveShows.map(episode => {
  return {
    alias: episode.show.alias,
    duration: (episode.realTo - episode.realFrom) / 1000,
    inThePast: episode.inThePast,
    mp3: episode.m3uUrl ? episode.m3uUrl.slice(0, -3) + 'mp3' : '',
    name: episode.show.name,
    showId: episode.show.id,
    text: episode.text ? episode.text.title : '------'
  };
});
