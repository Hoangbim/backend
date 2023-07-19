import fs from "fs";
import path from "path";

const p = path.join(process.cwd(), "data", "videoList.json");
const videos = JSON.parse(fs.readFileSync(p, "utf8"));
const Videos = {
  all: function () {
    return videos;
  },

  movieVideos: (id) => {
    const movieVideos = videos.find((movieId) => movieId.id === +id);

    if (!movieVideos) return "not found";

    if (movieVideos) {
      ///get videos that meet the conditions
      const listOfVideos = movieVideos.videos.filter(
        (video) =>
          !!video.official &&
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      );

      //find the latest video
      let latestVideo = listOfVideos[0];
      for (let i = 0; i < listOfVideos.length; i++) {
        if (listOfVideos[i].published_at > latestVideo.published_at)
          latestVideo = listOfVideos[i];
      }
      return latestVideo;
    }
  },
};

export default Videos;
