import { VocabularyTypes } from "./vocabulary.type";

export type CountWordTypes = {
  [K in VocabularyTypes]: number;
};
