import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

describe("TotalUpdates", () => {
  test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // make sure total starts out $0.00
    const ScoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(ScoopsSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const VanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.clear(VanillaInput);
    await user.type(VanillaInput, "1");
    expect(ScoopsSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal
    const ChocolateInput = await screen.findByRole("spinbutton", { name: /chocolate/i });
    await user.clear(ChocolateInput);
    await user.type(ChocolateInput, "2");
    expect(ScoopsSubtotal).toHaveTextContent("6.00");
  });
});
