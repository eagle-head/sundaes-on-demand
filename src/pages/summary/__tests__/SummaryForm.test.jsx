import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);
    const Checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    expect(Checkbox).not.toBeChecked();

    const ConfirmButton = screen.getByRole("button", { name: /confirm order/i });
    expect(ConfirmButton).toBeDisabled();
  });

  test("Checkbox enables button on first click and disables on second click", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const Checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const ConfirmButton = screen.getByRole("button", { name: /confirm order/i });

    await user.click(Checkbox);
    expect(ConfirmButton).toBeEnabled();

    await user.click(Checkbox);
    expect(ConfirmButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const NullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(NullPopover).not.toBeInTheDocument();

    const TermsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(TermsAndConditions);
    const Popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(Popover).toBeInTheDocument();

    await user.unhover(TermsAndConditions);
    expect(Popover).not.toBeInTheDocument();
  });
});
