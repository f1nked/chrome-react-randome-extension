import { getRandomWikiPage, getCheckGroup, getCheckUser } from "services";
import { ServiceContext } from "types";

type ServiceStrategy = {
  run(context: ServiceContext): void;
};
type OptionMap = {
  [key: string]: (context: ServiceContext) => void;
};

type ServiceMap = {
  [key: string]: typeof WikiService | typeof VkService;
};

export class WikiService implements ServiceStrategy {
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

export class VkService implements ServiceStrategy {
  private options: OptionMap = {
    user: this.user.bind(this),
    group: this.group.bind(this),
  };

  private group(context: ServiceContext) {
    const randomId: number = Math.floor(Math.random() * 999999998) + 1;
    context.isLoopingRef.current = true;
    getCheckGroup(randomId, context.key, context.controller)
      .then((response) => {
        if (
          typeof response.response[0]["deactivated"] === "undefined" &&
          response.response[0]["name"] !== "DELETED" &&
          response.response[0]["is_closed"] !== 2 &&
          response.response[0]["is_closed"] !== 1
        ) {
          context.isLoopingRef.current = false;
          context.redirect(`${context.adress}/${response.response[0].screen_name}`);
        }
      })
      .catch(() => {
        context.isLoopingRef.current = false;
      })
      .finally(() => {
        if (context.isLoopingRef.current) {
          context.intervalRef.current = setTimeout(() => {
            this.group(context);
          }, 1000);
        } else {
          context.updateLoading(false);
        }
      });
  }
  private user(context: ServiceContext) {
    const randomId: number = Math.floor(Math.random() * 999999998) + 1;
    context.isLoopingRef.current = true;
    getCheckUser(randomId, context.key, context.controller)
      .then((response) => {
        if (
          response.response[0].can_access_closed === true &&
          response.response[0].is_closed === false &&
          typeof response.response[0]["deactivated"] === "undefined"
        ) {
          context.isLoopingRef.current = false;
          context.redirect(`${context.adress}/${response.response[0].domain}`);
        }
      })
      .catch(() => {
        context.isLoopingRef.current = false;
      })
      .finally(() => {
        if (context.isLoopingRef.current) {
          context.intervalRef.current = setTimeout(() => {
            this.user(context);
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

export class RequestStrategy {
  constructor(private strategy: ServiceStrategy) {}
  async run(context: ServiceContext) {
    return await this.strategy.run(context);
  }
}

export class ServiceFactory {
  private static services: ServiceMap = {
    wiki: WikiService,
    vk: VkService,
  };
  create(serviceName: string) {
    const Service = ServiceFactory.services[serviceName];
    if (!Service) {
      throw new Error(`Invalid service name: ${serviceName}`);
    }
    return new Service();
  }
}
