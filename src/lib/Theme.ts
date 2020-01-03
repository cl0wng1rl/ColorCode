import * as Color from "color";
import ThemeSettings from "./ThemeSettings";

export default class Theme {
  static generateSettingsFromColorStrings(colourStrings: Number[][]): ThemeSettings {
    let colours = Theme.getColoursFromColourStrings(colourStrings);
    colours = Theme.orderColoursByLightness(colours);
    const jsonEditorTheme = Theme.createJSONEditorTheme(colours);
    const jsonWorkbenchTheme = Theme.createJSONWorkbenchTheme(colours);
    return new ThemeSettings(jsonWorkbenchTheme, jsonEditorTheme);
  }

  private static getColoursFromColourStrings(colourStrings: Number[][]): Color[] {
    let colours: Color[] = [];
    colourStrings.forEach(c => {
      colours.push(Color.rgb(c));
    });
    return colours;
  }

  private static orderColoursByLightness(colours: Color[]) {
    let orderedColours = colours;
    orderedColours.sort((a, b) => a.hsl().array()[2] - b.hsl().array()[2]);
    return orderedColours;
  }

  private static createJSONEditorTheme(colours: Color[]): Object {
    return {
      textMateRules: [
        {
          scope: ["keyword"],
          settings: {
            foreground: `${colours[4].hex()}`
          }
        },
        {
          scope: ["keyword.other.class"],
          settings: {
            foreground: `${colours[3].lighten(0.4).hex()}`
          }
        },
        {
          scope: ["storage.modifier"],
          settings: {
            foreground: `${colours[2].lighten(0.4).hex()}`
          }
        },
        {
          scope: ["constant.language"],
          settings: {
            foreground: `${colours[3].saturate(0.9).hex()}`
          }
        },
        {
          scope: ["constant.escape", "constant.numeric"],
          settings: {
            foreground: `${colours[2]
              .lighten(0.7)
              .saturate(0.7)
              .hex()}`
          }
        }
      ],
      comments: `${colours[0]
        .lighten(0.6)
        .saturate(0.5)
        .hex()}`,
      functions: `${colours[2]
        .lighten(0.4)
        .saturate(0.5)
        .hex()}`,
      keywords: `${colours[3]
        .lighten(0.2)
        .saturate(0.5)
        .hex()}`,
      numbers: `${colours[3]
        .lighten(0.2)
        .saturate(0.5)
        .hex()}`,
      strings: `${colours[1]
        .lighten(0.6)
        .saturate(0.5)
        .hex()}`,
      types: `${colours[1]
        .lighten(0.2)
        .saturate(0.5)
        .hex()}`,
      variables: `${colours[4]
        .darken(0.3)
        .saturate(0.5)
        .hex()}`
    };
  }

  private static createJSONWorkbenchTheme(colours: Color[]): Object {
    return {
      focusBorder: `${colours[0].darken(0.5).hex()}`,
      foreground: `${colours[4].hex()}`,
      "widget.shadow": `${colours[0].darken(0.6).hex()}`,
      "selection.background": `${colours[0].darken(0.7).hex()}`,
      descriptionForeground: `${colours[3].darken(0.6).hex()}`,
      errorForeground: `${colours[3].hex()}`,
      "editor.background": `${colours[0].darken(0.7).hex()}`,
      "sideBar.background": `${colours[0].darken(0.6).hex()}`,
      "sideBar.foreground": `${colours[3].lighten(0.3).hex()}`,
      "menu.background": `${colours[0].darken(0.7).hex()}`,
      "menu.foreground": `${colours[2].hex()}`,
      "terminal.background": `${colours[0].darken(0.6).hex()}`,
      "badge.background": `${colours[0].darken(0.8).hex()}`,
      "input.background": `${colours[0].darken(0.7).hex()}`,
      "panel.background": `${colours[0].darken(0.6).hex()}`,
      "tab.activeBackground": `${colours[0].darken(0.8).hex()}`,
      "tab.inactiveBackground": `${colours[0].darken(0.6).hex()}`,
      "button.background": `${colours[0].darken(0.8).hex()}`,
      "activityBar.background": `${colours[0].darken(0.7).hex()}`
    };
  }
}
