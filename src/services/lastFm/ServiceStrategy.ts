import { getTrack, getArtist } from "./ServicesApi";
import { ServiceContext, ServiceStrategy, OptionMap } from "types";

export default class LastService implements ServiceStrategy {
  private options: OptionMap = {
    track: this.track.bind(this),
    artist: this.artist.bind(this),
  };

  private generateMbid() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChars = Math.random()
      .toString(36)
      .substring(2, randomNumber + 3);
    return randomChars;
  }

  private track(context: ServiceContext) {
    const randomSearch = this.generateMbid();
    context.isLoopingRef.current = true;
    getTrack(randomSearch, context.key, context.controller)
      .then((response: { results: { trackmatches: { track: string | any[] } } }) => {
        if (response.results.trackmatches.track.length > 0) {
          const randomTrackIndex = Math.floor(
            Math.random() * response.results.trackmatches.track.length
          );
          const randomTrackUrl = response.results.trackmatches.track[randomTrackIndex].url;
          context.isLoopingRef.current = false;
          context.redirect(`${randomTrackUrl}`);
        }
      })
      .catch(() => {
        context.isLoopingRef.current = false;
      })
      .finally(() => {
        if (context.isLoopingRef.current) {
          context.intervalRef.current = setTimeout(() => {
            this.track(context);
          }, 1000);
        } else {
          context.updateLoading(false);
        }
      });
  }
  private artist(context: ServiceContext) {
    const randomSearch = this.generateMbid();
    context.isLoopingRef.current = true;
    getArtist(randomSearch, context.key, context.controller)
      .then((response: { results: { artistmatches: { artist: string | any[] } } }) => {
        if (response.results.artistmatches.artist.length > 0) {
          const randomArtistIndex = Math.floor(
            Math.random() * response.results.artistmatches.artist.length
          );
          const randomArtistUrl = response.results.artistmatches.artist[randomArtistIndex].url;
          context.isLoopingRef.current = false;
          context.redirect(`${randomArtistUrl}`);
        }
      })
      .catch(() => {
        context.isLoopingRef.current = false;
      })
      .finally(() => {
        if (context.isLoopingRef.current) {
          context.intervalRef.current = setTimeout(() => {
            this.artist(context);
          }, 1000);
        } else {
          context.updateLoading(false);
        }
      });
  }
  run(context: ServiceContext) {
    const option = this.options[context.optionValue];
    if (!option) {
      throw new Error(`Invalid option value: ${context.optionValue}`);
    }
    return option(context);
  }
}
