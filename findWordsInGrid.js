function findWordsInGrid(grid, validWords) {
  validateInputs(grid, validWords);

  const rows = grid.length;
  const cols = grid[0].length;
  const normalizedGrid = grid.map((row) => row.map((cell) => String(cell).toLowerCase()));
  const trie = buildTrie(validWords.map((word) => word.toLowerCase()));
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const found = new Set();

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      dfs(row, col, trie.root);
    }
  }

  return Array.from(found);

  function dfs(row, col, node) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col]) {
      return;
    }

    const char = normalizedGrid[row][col];
    const nextNode = node.children.get(char);
    if (!nextNode) {
      return;
    }

    visited[row][col] = true;

    if (nextNode.isWord) {
      found.add(nextNode.word);
    }

    for (let rowDelta = -1; rowDelta <= 1; rowDelta += 1) {
      for (let colDelta = -1; colDelta <= 1; colDelta += 1) {
        if (rowDelta === 0 && colDelta === 0) {
          continue;
        }

        dfs(row + rowDelta, col + colDelta, nextNode);
      }
    }

    visited[row][col] = false;
  }
}

function buildTrie(words) {
  const root = createNode();

  for (const word of words) {
    let current = root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, createNode());
      }
      current = current.children.get(char);
    }

    current.isWord = true;
    current.word = word;
  }

  return { root };
}

function createNode() {
  return {
    children: new Map(),
    isWord: false,
    word: null,
  };
}

function validateInputs(grid, validWords) {
  if (!Array.isArray(grid) || grid.length === 0 || !Array.isArray(grid[0]) || grid[0].length === 0) {
    throw new TypeError("Grid must be a non-empty 2D array");
  }

  const cols = grid[0].length;
  for (const row of grid) {
    if (!Array.isArray(row) || row.length !== cols) {
      throw new TypeError("Grid must be rectangular");
    }

    for (const cell of row) {
      if (typeof cell !== "string" || cell.length !== 1) {
        throw new TypeError("Grid cells must be single-character strings");
      }
    }
  }

  if (!Array.isArray(validWords)) {
    throw new TypeError("Valid words must be an array of strings");
  }

  for (const word of validWords) {
    if (typeof word !== "string" || word.length === 0) {
      throw new TypeError("Each valid word must be a non-empty string");
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { findWordsInGrid };
}
