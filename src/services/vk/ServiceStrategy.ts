import { getCheckGroup, getCheckUser } from "./ServicesApi";
import { ServiceContext, ServiceStrategy, OptionMap } from "types";

export default class VkService implements ServiceStrategy {
  private options: OptionMap = {
    user: this.user.bind(this),
    group: this.group.bind(this),
  };

  private generateId() {
    return Math.floor(Math.random() * 999999998) + 1;
  }

  private group(context: ServiceContext) {
    const randomId: number = this.generateId();
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
    const randomId: number = this.generateId();
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
