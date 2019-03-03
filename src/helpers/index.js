const pad = num => num < 10 ? '0' + num : num;

export const format = time => {
    if (isNaN(time)) return '--:--:--';
    const hours = Math.floor(time / (60 * 60))
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.ceil((time % 60));
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
