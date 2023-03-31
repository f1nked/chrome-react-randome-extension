import { ServiceContext, ServiceStrategy } from "types";
import { WikiService, VkService, LastService, YouTubeService } from "./";
import { ServiceNames } from "services/ServiceData";

type ServiceMap = {
  [key: string]: typeof WikiService | typeof VkService | typeof LastService | typeof YouTubeService;
};

export class RequestStrategy {
  constructor(private strategy: ServiceStrategy) {}
  async run(context: ServiceContext) {
    return await this.strategy.run(context);
  }
}

export class ServiceFactory {
  private static services: ServiceMap = {
    [ServiceNames.WIKI]: WikiService,
    [ServiceNames.VK]: VkService,
    [ServiceNames.LAST]: LastService,
    [ServiceNames.YOUTUBE]: YouTubeService,
  };
  create(serviceName: string) {
    const Service = ServiceFactory.services[serviceName];
    if (!Service) {
      throw new Error(`Invalid service name: ${serviceName}`);
    }
    return new Service();
  }
}
