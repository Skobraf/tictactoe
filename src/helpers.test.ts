import {
  createBoard,
  isHorizontalWinner,
  isVerticalWinner,
  isDiagonalWinner,
} from "./helpers";

describe("test helpers functionality", () => {
  it("generate a board of size 3*3", () => {
    expect(createBoard(3)).toEqual([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  });

  it("should return true when Horizental win", () => {
    expect(
      isHorizontalWinner("X", [
        ["X", "X", "X"],
        ["X", "O", "X"],
        ["0", "X", "O"],
      ])
    ).toBe(true);
  });

  it("should return true when Vertical win", () => {
    expect(
      isVerticalWinner("O", [
        ["X", "O", "O"],
        ["X", "O", "X"],
        ["O", "O", "X"],
      ])
    ).toBe(true);
  });

  it("should return true when Diagonal win", () => {
    expect(
      isDiagonalWinner("X", [
        ["X", "O", "O"],
        ["O", "X", "X"],
        ["O", "O", "X"],
      ])
    ).toBe(true);
  });
});
