enum WordTypes {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
  ADVERB = "adverb",
  PREPOSITION = "preposition",
  CONJUNCTION = "conjunction",
  PRONOUN = "pronoun",
  DETERMINER = "determiner",
  INTERJECTION = "interjection",
  NUMERAL = "numeral",
}

export type CountWordTypes = {
  [K in WordTypes]: number;
};
