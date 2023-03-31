import { getVideo, getChannel } from "./ServicesApi";
import { ServiceContext, ServiceStrategy, OptionMap } from "types";

export default class YouTubeService implements ServiceStrategy {
  private options: OptionMap = {
    video: this.video.bind(this),
    channel: this.channel.bind(this),
  };

  private generateSearch() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChars = Math.random()
      .toString(36)
      .substring(2, randomNumber + 3);
    return randomChars;
  }

  private video(context: ServiceContext) {
    const randomSearch = this.generateSearch();
    context.isLoopingRef.current = true;
    getVideo(randomSearch, context.key, context.controller)
      .then((response: any) => {
        if (response.items.length > 0) {
          const randomVideoIndex = Math.floor(Math.random() * response.items.length);
          const randomVideoId = response.items[randomVideoIndex].id.videoId;
          context.isLoopingRef.current = false;
          context.redirect(`${context.adress}/watch?v=${randomVideoId}`);
        }
      })
      .catch(() => {
        context.isLoopingRef.current = false;
      })
      .finally(() => {
        if (context.isLoopingRef.current) {
          context.intervalRef.current = setTimeout(() => {
            this.video(context);
          }, 1000);
        } else {
          context.updateLoading(false);
        }
      });
  }
  private channel(context: ServiceContext) {
    const randomSearch = this.generateSearch();
    context.isLoopingRef.current = true;
    getChannel(randomSearch, context.key, context.controller)
      .then((response: any) => {
        if (response.items.length > 0) {
          const randomChannelIndex = Math.floor(Math.random() * response.items.length);
          const randomChannelId = response.items[randomChannelIndex].snippet.channelId;
          context.isLoopingRef.current = false;
          console.log(response.items[randomChannelIndex]);
          console.log(randomChannelIndex);
          console.log(randomChannelId);
          console.log(`${context.adress}/channel/${randomChannelId}`);

          context.redirect(`${context.adress}/channel/${randomChannelId}`);
        }
      })
      .catch(() => {
        context.isLoopingRef.current = false;
      })
      .finally(() => {
        if (context.isLoopingRef.current) {
          context.intervalRef.current = setTimeout(() => {
            this.channel(context);
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
