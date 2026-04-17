function generateLetterGrid() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const grid = [];

  for (let row = 0; row < 10; row += 1) {
    const currentRow = [];
    for (let col = 0; col < 10; col += 1) {
      const letterIndex = Math.floor(Math.random() * letters.length);
      currentRow.push(letters[letterIndex]);
    }
    grid.push(currentRow);
  }

  return grid;
}

function gridToString(grid) {
  return grid.map((row) => row.join(" ")).join("\n");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { generateLetterGrid, gridToString };
}
