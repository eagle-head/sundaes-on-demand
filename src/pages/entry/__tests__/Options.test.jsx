import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

describe("Options", () => {
  test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // find images
    const ScoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(ScoopImages).toHaveLength(2);

    // confirm alt text of images
    const AltText = ScoopImages.map((element) => element.alt);
    expect(AltText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("Displays image for each toppings option from server", async () => {
    render(<Options optionType="toppings" />);

    const Images = await screen.findAllByRole("img", { name: /topping$/i });
    expect(Images).toHaveLength(3);

    const ImageTitles = Images.map((image) => image.alt);
    expect(ImageTitles).toStrictEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
  });
});
