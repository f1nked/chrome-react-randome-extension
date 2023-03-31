import axios from "axios";

export const getRandomWikiPage = async (controller: AbortController, language: string | null) => {
  try {
    const response = await axios.get(
      `https://${language}.wikipedia.org/api/rest_v1/page/random/summary`,
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
    throw new Error(`getRandomWikiPage Fail`);
  }
};
