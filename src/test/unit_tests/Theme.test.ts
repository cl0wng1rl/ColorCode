import { assert } from "chai";
import "mocha";
import Theme from "../../lib/Theme";
import ThemeSettings from "../../lib/ThemeSettings";

describe("Theme: generateSettingsFromColorStrings", () => {
  const colorStrings: number[][] = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
  ];

  const theme = new Theme();
  const generatedSettings: ThemeSettings = theme.generateSettingsFromColorStrings(colorStrings);

  it("should return populated theme settings", () => {
    assert.exists(generatedSettings);

    assert.exists(generatedSettings.colorCustomizations);
    assert.exists(generatedSettings.tokenColorCustomizations);
  });
});
