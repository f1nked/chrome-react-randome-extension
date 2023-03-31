import { getRandomWikiPage } from "./ServicesApi";
import { ServiceContext, ServiceStrategy } from "types";

export default class WikiService implements ServiceStrategy {
  run(context: ServiceContext) {
    getRandomWikiPage(context.controller, context.optionValue)
      .then((response) => {
        if (response && response.content_urls.desktop.page) {
          context.redirect(response.content_urls.desktop.page);
        }
      })
      .finally(() => {
        context.updateLoading(false);
      });
  }
}
