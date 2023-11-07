import { FormEvent, useState } from "react";
import { isValidText } from "../utils/isValidText";
import { getWordTypes } from "../services/getWordTypes";
import { CountWordTypes } from "../types";
import { isAxiosError } from "axios";

const Form = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState<CountWordTypes>({
    noun: 0,
    verb: 0,
    adjective: 0,
    adverb: 0,
    preposition: 0,
    conjunction: 0,
    pronoun: 0,
    determiner: 0,
    interjection: 0,
    numeral: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isValidText(text)) {
        alert("Input can only containe english letters, commas and spaces");
        return;
      }
      setIsLoading(true);

      const result: CountWordTypes = await getWordTypes(text);

      setRes(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        alert(
          error.response?.data.message
            ? error.response?.data.message
            : error.message
        );
      } else throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Input text</label>
      <br />
      <textarea
        id="text"
        rows={20}
        style={{ width: "100%", maxWidth: "400px", height: "200px" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <br />
      <label>Results</label>
      <p
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "200px",
          whiteSpace: "pre-line",
          border: "1px solid black",
        }}
      >
        {isLoading
          ? "Loading..."
          : Object.keys(res)
              .map((key) => `${key}: ${res[key as keyof CountWordTypes]}`)
              .join("\n")}
      </p>
      <br />
      <button>Submit</button>
    </form>
  );
};

export default Form;
