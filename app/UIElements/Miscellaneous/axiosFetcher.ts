import axios, { AxiosError } from "axios";

export const axiosFetcher = async (url: string) => {
  let result;
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      result = response.data;
    } else {
      throw new Error("Unable to get data");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.code);
    } else {
      throw new Error("there is some error");
    }
  }
  return result;
};
