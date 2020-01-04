import * as Color from "color";
import ThemeSettings from "./ThemeSettings";

export default class Theme {
  static generateSettingsFromColorStrings(colourStrings: Number[][]): ThemeSettings {
    let colours = Theme.getColoursFromColourStrings(colourStrings);
    // colours = Theme.orderColoursByLightness(colours);
    colours = Theme.saturateColours(colours);
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

  private static saturateColours(colours: Color[]): Color[] {
    return colours.map(color => color.saturate(0.6));
  }

  private static createJSONEditorTheme(colours: Color[]): Object {
    const standardColors = Theme.getStandardColors(colours);
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
      comments: standardColors.comments,
      functions: standardColors.functions,
      keywords: standardColors.keywords,
      numbers: standardColors.numbers,
      strings: standardColors.strings,
      types: standardColors.types,
      variables: standardColors.variables
    };
  }
  // 23-33-47/57-71-89/126-131-144/154-199-184/235-217-204

  private static createJSONWorkbenchTheme(colours: Color[]): Object {
    const standardColors = Theme.getStandardColors(colours);
    return {
      foreground: standardColors.foreground,
      "editor.foreground": standardColors.foreground,
      "widget.shadow": standardColors.borderBackground,
      descriptionForeground: `${colours[3].darken(0.6).hex()}`,
      errorForeground: `${colours[3].hex()}`,
      "sideBar.foreground": standardColors.foreground,
      focusBorder: standardColors.borderBackground,
      "editor.background": standardColors.background,
      "sideBar.background": standardColors.background,
      "sideBar.border": standardColors.contrastBackground,
      "terminal.background": standardColors.contrastBackground,
      "selection.background": standardColors.borderBackground,
      "badge.background": standardColors.trimBackground,
      "input.background": standardColors.contrastBackground,
      "panel.background": standardColors.trimBackground,
      "editorGroupHeader.tabsBackground": standardColors.trimBackground,
      "tab.activeBackground": standardColors.background,
      "tab.inactiveBackground": standardColors.contrastBackground,
      "activityBar.background": standardColors.contrastBackground
    };
  }

  private static getStandardColors(colors: Color[]) {
    const hslArrays = colors.map(color => color.hsl().array());
    return {
      background: Color.hsl([hslArrays[0][0], hslArrays[0][1], 10]).hex(),
      contrastBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 6]).hex(),
      trimBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 15]).hex(),
      borderBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 18]).hex(),
      foreground: Color.hsl([hslArrays[3][0], hslArrays[3][1], 80]).hex(),
      comments: Color.hsl([hslArrays[0][0], hslArrays[0][1] * 1.2, 60]).hex(),
      functions: Color.hsl([hslArrays[2][0], hslArrays[2][1] * 1.2, 40]).hex(),
      keywords: Color.hsl([hslArrays[3][0], hslArrays[3][1] * 1.2, 30]).hex(),
      numbers: Color.hsl([hslArrays[2][0], hslArrays[2][1] * 1.2, 30]).hex(),
      strings: Color.hsl([hslArrays[1][0], hslArrays[1][1] * 1.2, 60]).hex(),
      types: Color.hsl([hslArrays[1][0], hslArrays[1][1] * 1.2, 40]).hex(),
      variables: Color.hsl([hslArrays[4][0], hslArrays[4][1] * 1.2, 50]).hex()
    };
  }
}
