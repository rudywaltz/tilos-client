function pad(num) {
  return String(num).padStart(2, '0');
}

export function format(time) {
  if (isNaN(time)) return '--:--:--';
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.ceil(time % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function normailezeString(str) {
  return str.length
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : str;
}

export function episodeMapper(archiveShows) {
  return archiveShows.map(function mapEpisode(episode) {
    const {
      show: { id, alias, name },
      realTo,
      realFrom,
      inThePast,
      m3uUrl,
      text: { title = '-------', formatted = '' } = {},
    } = episode;

    return {
      alias,
      name,
      showId: id,
      text: title,
      inThePast,
      duration: (realTo - realFrom) / 1000,
      mp3: m3uUrl ? m3uUrl.slice(0, -3) + 'mp3' : '',
      text: title,
      formatted,
    };
  });
}
