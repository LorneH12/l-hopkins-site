// Only one video plays at a time: starting one pauses the others.
export function initVideos() {
  const videos = [...document.querySelectorAll('video')];
  videos.forEach((video) => {
    video.addEventListener('play', () => {
      videos.forEach((other) => { if (other !== video) other.pause(); });
    });
  });
}
