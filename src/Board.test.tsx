import {
  render,
  fireEvent,
  createEvent,
} from "@testing-library/react";
import { Board } from "./Board";

describe("rendering board", () => {
  const renderBoard = () => render(<Board />);

  it("should render new game button", () => {
    const { getByText } = renderBoard();
    const newGame = getByText("New Game");
    expect(newGame).toBeVisible();
  });

  it("should render input with value of 3 and be changeable", () => {
    const { getByLabelText } = renderBoard();
    const boardSizeInput = getByLabelText("board-size");

    expect(boardSizeInput).toHaveValue(3);

    fireEvent.change(boardSizeInput, { target: { value: "23" } });
    expect(boardSizeInput).toHaveValue(23);
  });

  it("should render player1 input", () => {
    const { getByLabelText } = renderBoard();
    const player1Input = getByLabelText("player1");

    expect(player1Input).toHaveValue("player 1");

    fireEvent.change(player1Input, { target: { value: "first player" } });
    expect(player1Input).toHaveValue("first player");
  });
  it("should render player2 input", () => {
    const { getByLabelText } = renderBoard();
    const player2Input = getByLabelText("player2");

    expect(player2Input).toHaveValue("player 2");

    fireEvent.change(player2Input, { target: { value: "second player" } });
    expect(player2Input).toHaveValue("second player");
  });

  it("first cell should have X when first click", async () => {
    const { findByTestId } = renderBoard();

    const cellClick = await findByTestId("cell-click 0 0");
    fireEvent(cellClick, createEvent.click(cellClick));
    expect(cellClick.innerHTML).toBe("X");

    const cellClick2 = await findByTestId("cell-click 0 1");
    fireEvent(cellClick2, createEvent.click(cellClick2));
    expect(cellClick2.innerHTML).toBe("O");
  });

  it("board should be empty when clicking new game", async () => {
    const { findByTestId, getByText } = renderBoard();
    const newGameButton = getByText("New Game");

    const cellClick2 = await findByTestId("cell-click 0 1");
    fireEvent(cellClick2, createEvent.click(cellClick2));
    expect(cellClick2.innerHTML).toBe("X");

    fireEvent(newGameButton, createEvent.click(newGameButton));
    expect(cellClick2.innerHTML).toBe("");
  });

  it("should render board of 3 * 3", () => {
    const { getAllByLabelText } = renderBoard();
    const boardSize = getAllByLabelText("board-buttons");
    expect(boardSize).toHaveLength(9);
  });

  it("should have the size of board-size input", () => {
    const {getByLabelText, getAllByLabelText, getByText} = renderBoard();
    const boardSizeInput = getByLabelText('board-size');

    fireEvent.change(boardSizeInput, {target: {value: 4}})
    expect(boardSizeInput).toHaveValue(4);
    const resetGameButton = getByText("New Game");

    fireEvent.click(resetGameButton, createEvent.click(resetGameButton));

    const board = getAllByLabelText('board-buttons');
    expect(board).toHaveLength(16)

  });
});
