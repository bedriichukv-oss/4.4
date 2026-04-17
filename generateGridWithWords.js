const { generateLetterGrid, gridToString } = require("./generateLetterGrid");
const { findWordsInGrid } = require("./findWordsInGrid");

function pickRandomWords(words, count) {
  const shuffled = [...words];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

function generateGridWithAtLeastTenWords(validWords) {
  if (!Array.isArray(validWords)) {
    throw new TypeError("validWords must be an array of strings");
  }

  const normalizedUniqueWords = Array.from(
    new Set(
      validWords
        .filter((word) => typeof word === "string")
        .map((word) => word.trim().toLowerCase())
        .filter((word) => /^[a-z]+$/.test(word) && word.length >= 2 && word.length <= 10)
    )
  );

  if (normalizedUniqueWords.length < 10) {
    throw new Error("Provide at least 10 unique alphabetic words with length between 2 and 10");
  }

  const grid = generateLetterGrid();
  const selectedWords = normalizedUniqueWords.slice(0, 10);

  // Place one required word on each row from left to right.
  for (let row = 0; row < 10; row += 1) {
    const word = selectedWords[row].toUpperCase();
    for (let col = 0; col < word.length; col += 1) {
      grid[row][col] = word[col];
    }
  }

  const foundWords = findWordsInGrid(grid, normalizedUniqueWords);

  if (foundWords.length < 10) {
    throw new Error("Failed to build a grid with at least 10 words");
  }

  const randomWords = pickRandomWords(foundWords, 10);

  console.log("Generated 10x10 Grid:\n");
  console.log(gridToString(grid));
  console.log("\n10 Random Words From Grid:");
  console.log(randomWords.join(", "));

  return {
    grid,
    foundWords,
    randomWords,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { generateGridWithAtLeastTenWords };
}
