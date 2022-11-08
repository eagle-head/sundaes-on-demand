import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import OrderEntry from "../OrderEntry";

describe("OrderEntry", () => {
  test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("https://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("https://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry />);

    await waitFor(async () => {
      const Alerts = await screen.findAllByRole("alert", { name: /unexpected error/i });
      expect(Alerts).toHaveLength(2);
    });
  });
});
