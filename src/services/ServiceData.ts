import { ServiceListType } from "types";

export enum ServiceNames {
  WIKI = "wiki",
  VK = "vk",
  LAST = "last",
  YOUTUBE = "youtube",
}

export const ServiceList: ServiceListType = [
  {
    name: ServiceNames.VK,
    id: 0,
    label: "vk.com",
    submenu: {
      items: [
        { label: "User page", value: "user" },
        { label: "Group page", value: "group" },
      ],
      value: "user",
    },
    adress: "https://vk.com",
    key: process.env.REACT_APP_VK_API_KEY,
  },
  {
    name: ServiceNames.WIKI,
    id: 1,
    label: "wikipedia.org",
    submenu: {
      items: [
        { label: "Russian page", value: "ru" },
        { label: "English page", value: "en" },
      ],
      value: "ru",
    },
    adress: null,
    key: null,
  },
  {
    name: ServiceNames.LAST,
    id: 2,
    label: "last.fm",
    submenu: {
      items: [
        { label: "Track page", value: "track" },
        { label: "Artist page", value: "artist" },
      ],
      value: "track",
    },
    adress: null,
    key: process.env.REACT_APP_LAST_API_KEY,
  },
  {
    name: ServiceNames.YOUTUBE,
    id: 3,
    label: "youtube.com",
    submenu: {
      items: [
        { label: "Video page", value: "video" },
        { label: "Channel page", value: "channel" },
      ],
      value: "video",
    },
    adress: "https://www.youtube.com",
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
];
