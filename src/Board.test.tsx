import { render, fireEvent, createEvent } from "@testing-library/react";
import { Board } from "./Board";

describe("rendering board", () => {
  const handleCellClick = jest.fn();

  function renderBoard() {
    return render(<Board />);
  }

});
