/** ====================================================================================
 * Utility functions for text analysis, readability scoring, and spelling/grammar checks.
 *  ==================================================================================== */

export interface ReadabilityMetrics {
  words: number;
  sentences: number;
  syllables: number;
  characters: number;
  fleschReadingEase: number;
  fleschKincaidGradeLevel: number;
  readingEaseDescription: string;
}

export interface SpellingGrammarIssue {
  id: string;
  type: "spelling" | "grammar";
  message: string;
  offset: number;
  length: number;
  originalText: string;
  suggestions: string[];
}

export interface AnalysisResult {
  metrics: ReadabilityMetrics;
  issues: SpellingGrammarIssue[];
}

/**
 * Counts syllables in an English word using standard heuristic rules.
 */
export const countSyllablesInWord = (word: string): number => {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) return 0;
  if (cleaned.length <= 3) return 1;

  // Remove silent 'e' at end
  let text = cleaned.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  text = text.replace(/^y/, "");

  // Match vowel sequences
  const syllableMatches = text.match(/[aeiouy]{1,2}/g);
  return syllableMatches ? Math.max(1, syllableMatches.length) : 1;
};

/**
 * Calculates Flesch-Kincaid readability metrics for the given text.
 */
export const calculateReadability = (text: string): ReadabilityMetrics => {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      words: 0,
      sentences: 0,
      syllables: 0,
      characters: 0,
      fleschReadingEase: 100,
      fleschKincaidGradeLevel: 0,
      readingEaseDescription: "Very Easy",
    };
  }

  // Count sentences (. ! ?)
  const sentenceMatches = trimmed.match(/[^.!?]+[.!?]+/g);
  const sentences = sentenceMatches ? sentenceMatches.length : 1;

  // Extract words
  const wordTokens = trimmed.match(/\b[a-zA-Z0-9']+\b/g) || [];
  const words = Math.max(1, wordTokens.length);
  const characters = trimmed.length;

  // Total syllables
  const syllables = wordTokens.reduce(
    (acc, word) => acc + countSyllablesInWord(word),
    0,
  );

  // Formulas
  // Flesch Reading Ease: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const rawEase =
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  const fleschReadingEase = Math.min(100, Math.max(0, Math.round(rawEase * 10) / 10));

  // Flesch-Kincaid Grade Level: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
  const rawGrade =
    0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  const fleschKincaidGradeLevel = Math.max(
    0,
    Math.round(rawGrade * 10) / 10,
  );

  let readingEaseDescription = "Very Easy";
  if (fleschReadingEase < 30) {
    readingEaseDescription = "Very Confusing / Professional";
  } else if (fleschReadingEase < 50) {
    readingEaseDescription = "Difficult (College level)";
  } else if (fleschReadingEase < 60) {
    readingEaseDescription = "Fairly Difficult (High school)";
  } else if (fleschReadingEase < 70) {
    readingEaseDescription = "Plain English (8th - 9th grade)";
  } else if (fleschReadingEase < 80) {
    readingEaseDescription = "Fairly Easy (7th grade)";
  } else if (fleschReadingEase < 90) {
    readingEaseDescription = "Easy (6th grade)";
  }

  return {
    words,
    sentences,
    syllables,
    characters,
    fleschReadingEase,
    fleschKincaidGradeLevel,
    readingEaseDescription,
  };
};

/**
 * Common English misspellings dictionary for quick client-side checking.
 */
const COMMON_MISSPELLINGS: Record<string, string[]> = {
  teh: ["the"],
  receive: ["receive"],
  recieve: ["receive"],
  seperate: ["separate"],
  definately: ["definitely"],
  accommodate: ["accommodate"],
  acommodate: ["accommodate"],
  occured: ["occurred"],
  until: ["until"],
  untill: ["until"],
  thier: ["their"],
  tihs: ["this"],
  adress: ["address"],
  wether: ["whether", "weather"],
  becuase: ["because"],
};

/**
 * Basic grammar patterns (e.g. repeated words like "the the", passive voice indicators, etc.)
 */
const REPEATED_WORDS_REGEX = /\b([a-zA-Z]+)\s+\1\b/gi;

/**
 * Analyzes text for spelling errors, grammar suggestions, and readability statistics.
 */
export const analyzeText = (text: string): AnalysisResult => {
  const metrics = calculateReadability(text);
  const issues: SpellingGrammarIssue[] = [];

  if (!text.trim()) {
    return { metrics, issues };
  }

  // 1. Check repeated words (Grammar)
  let match: RegExpExecArray | null;
  while ((match = REPEATED_WORDS_REGEX.exec(text)) !== null) {
    issues.push({
      id: `grammar-dup-${match.index}`,
      type: "grammar",
      message: `Repeated word "${match[1]}"`,
      offset: match.index,
      length: match[0].length,
      originalText: match[0],
      suggestions: [match[1]],
    });
  }

  // 2. Check common misspellings (Spelling)
  const wordRegex = /\b([a-zA-Z]+)\b/g;
  while ((match = wordRegex.exec(text)) !== null) {
    const word = match[1];
    const lower = word.toLowerCase();

    if (COMMON_MISSPELLINGS[lower]) {
      const isCapitalized = word[0] === word[0].toUpperCase();
      const suggestions = COMMON_MISSPELLINGS[lower].map((sug) =>
        isCapitalized ? sug[0].toUpperCase() + sug.slice(1) : sug,
      );

      issues.push({
        id: `spelling-${match.index}`,
        type: "spelling",
        message: `Possible misspelling: "${word}"`,
        offset: match.index,
        length: word.length,
        originalText: word,
        suggestions,
      });
    }
  }

  return { metrics, issues };
};

