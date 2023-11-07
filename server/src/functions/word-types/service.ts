import { CountWordTypes, Vocabulary, VocabularyTypes, WordTypes } from "./types";

export default class WordTypesService {
  private optimizedVocabulary: WordTypes;
  private initialWordTypeCounts: CountWordTypes;

  constructor(vocabulary: Vocabulary) {
    this.optimizedVocabulary = this.optimizeVocabulary(vocabulary);
    this.initialWordTypeCounts = this.createInitialWordTypeCounts();
  }

  private optimizeVocabulary(vocabulary: Vocabulary): WordTypes {
    const optimizedVocab: WordTypes = {};
    for (const [type, words] of Object.entries(vocabulary)) {
      for (const word of words) {
        optimizedVocab[word] = type as VocabularyTypes;
      }
    }
    return optimizedVocab;
  }

  private createInitialWordTypeCounts(): CountWordTypes {
    const counts: CountWordTypes = {} as CountWordTypes;
    for (const type of Object.values(VocabularyTypes)) {
      counts[type as VocabularyTypes] = 0;
    }
    return counts;
  }

  public getWordTypeCounts(inputText: string): CountWordTypes {
    const words = inputText.replace(/[^\w\s]|_/g, "").toLowerCase().split(/\s+/);
    
    const wordTypeCounts: CountWordTypes = { ...this.initialWordTypeCounts };

    for (const word of words) {
      const type = this.optimizedVocabulary[word];
      if (type) {
        wordTypeCounts[type] = (wordTypeCounts[type] || 0) + 1;
      }
    }

    return wordTypeCounts;
  }
}
