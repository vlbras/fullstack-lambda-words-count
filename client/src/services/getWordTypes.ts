import axios from "axios";
import { CountWordTypes } from "../types";

export const getWordTypes = async (text: string): Promise<CountWordTypes> => {
  const data = {
    text,
  };

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/dev/word-types`,
    data
  );

  return res.data as CountWordTypes;
};
