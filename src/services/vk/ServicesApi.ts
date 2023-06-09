import axios from "axios";

export const getCheckUser = async (
  userID: number,
  token: string | null | undefined,
  controller: AbortController
) => {
  try {
    const response = await axios.get(`https://api.vk.com/method/users.get`, {
      params: {
        user_ids: userID,
        fields: "domain",
        access_token: token,
        v: "5.89",
      },
      signal: controller.signal,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        mode: "no-cors",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`getCheckUser fail`);
  }
};
export const getCheckGroup = async (
  groupID: number,
  token: string | null | undefined,
  controller: AbortController
) => {
  try {
    const response = await axios.get(`https://api.vk.com/method/groups.getById`, {
      params: {
        group_id: groupID,
        fields: "screen_name",
        access_token: token,
        v: "5.131",
      },
      signal: controller.signal,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
        mode: "no-cors",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`getCheckGroup fail`);
  }
};
