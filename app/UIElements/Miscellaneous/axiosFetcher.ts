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
      console.log(error.cause);
    } else {
      console.log(error);
    }
  }
  return result;
};
