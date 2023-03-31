import axios from "axios";

export const getVideo = async (
  searchString: string,
  token: string | null | undefined,
  controller: AbortController
) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${searchString}&type=video&key=${token}`,
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
    throw new Error(`getVideo fail`);
  }
};
export const getChannel = async (
  searchString: string,
  token: string | null | undefined,
  controller: AbortController
) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${searchString}&type=cannel&key=${token}`,
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
    throw new Error(`getChannel fail`);
  }
};
