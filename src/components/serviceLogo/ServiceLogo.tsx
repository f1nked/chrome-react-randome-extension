import React from "react";
import { ReactComponent as VkLogo } from "services/vk/logo/vk_logo.svg";
import { ReactComponent as WikiLogo } from "services/wiki/logo/wiki_logo.svg";
import { ReactComponent as LastFmLogo } from "services/lastFm/logo/last_fm_logo.svg";
import { ReactComponent as YouTubeLogo } from "services/youtube/logo/youtube_logo.svg";
import { ServiceNames } from "services/ServiceData";
import { ServiceName } from "types";

type LogoStrategy = {
  [key in ServiceName["name"]]: React.FC;
};

const ServiceLogo: React.FC<ServiceName> = ({ name }) => {
  const logoStrategies: LogoStrategy = {
    [ServiceNames.VK]: VkLogo,
    [ServiceNames.WIKI]: WikiLogo,
    [ServiceNames.LAST]: LastFmLogo,
    [ServiceNames.YOUTUBE]: YouTubeLogo,
  };

  const LogoComponent = logoStrategies[name];

  return <LogoComponent />;
};

export default ServiceLogo;
