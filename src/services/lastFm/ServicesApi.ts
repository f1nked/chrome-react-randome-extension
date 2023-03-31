import axios from "axios";

export const getTrack = async (
  searchString: string,
  token: string | null | undefined,
  controller: AbortController
) => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=${token}&format=json&track=${searchString}&limit=100`,
      {
        signal: controller.signal,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
          mode: "no-cors",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`getTrack fail`);
  }
};
export const getArtist = async (
  searchString: string,
  token: string | null | undefined,
  controller: AbortController
) => {
  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=${token}&format=json&artist=${searchString}&limit=100`,
      {
        signal: controller.signal,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
          mode: "no-cors",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`getArtist fail`);
  }
};
