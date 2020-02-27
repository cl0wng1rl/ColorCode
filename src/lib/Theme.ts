import * as Color from "color";
import ThemeSettings from "./ThemeSettings";

export default class Theme {
  public generateSettingsFromColorStrings(colorStrings: number[][]): ThemeSettings {
    let colors = this.getColorsFromColorStrings(colorStrings);
    colors = this.saturateColors(colors);
    const jsonEditorTheme = this.createJSONEditorTheme(colors);
    const jsonWorkbenchTheme = this.createJSONWorkbenchTheme(colors);
    return new ThemeSettings(jsonWorkbenchTheme, jsonEditorTheme);
  }

  private getColorsFromColorStrings(colorStrings: number[][]): Color[] {
    let colors: Color[] = [];
    colorStrings.forEach(c => {
      colors.push(Color.rgb(c));
    });
    return colors;
  }

  private saturateColors(colors: Color[]): Color[] {
    return colors.map(color => color.saturate(0.6));
  }

  private createJSONEditorTheme(colors: Color[]): Object {
    const standardColors = this.getStandardColors(colors);
    return {
      textMateRules: [
        {
          scope: ["keyword"],
          settings: {
            foreground: standardColors.keywords
          }
        },
        {
          scope: ["keyword.operator.arithmetic.js"],
          settings: {
            foreground: standardColors.operators
          }
        },
        {
          scope: ["keyword.operator.new"],
          settings: {
            foreground: standardColors.newKeyword,
            fontStyle: "bold"
          }
        },
        {
          scope: [
            "variable.other.property",
            "storage.type.property.js",
            "storage.type.property.ts",
            "storage.type.property.tsx"
          ],
          settings: {
            foreground: standardColors.properties,
            fontStyle: "italic"
          }
        },
        {
          scope: ["storage.type.class"],
          settings: {
            foreground: standardColors.classKeyword,
            fontStyle: "bold"
          }
        },
        {
          scope: ["keyword.other.class, entity.name.type.class"],
          settings: {
            foreground: standardColors.classNames
          }
        },
        {
          scope: ["storage.modifier"],
          settings: {
            foreground: standardColors.modifiers
          }
        },
        {
          scope: ["constant.language"],
          settings: {
            foreground: standardColors.booleans,
            fontStyle: "italic"
          }
        },
        {
          scope: ["support.type.property-name.json"],
          settings: {
            foreground: standardColors.keywords
          }
        },
        {
          scope: ["support.constant.json"],
          settings: {
            foreground: standardColors.variables
          }
        },
        {
          scope: [
            "meta.structure.dictionary.json meta.structure.dictionary.value constant.language"
          ],
          settings: {
            foreground: standardColors.classKeyword
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

  private createJSONWorkbenchTheme(colors: Color[]): Object {
    const standardColors = this.getStandardColors(colors);
    let a = 3 + 2;
    return {
      foreground: standardColors.foreground,
      "editor.foreground": standardColors.textForeground,
      "widget.shadow": standardColors.borderBackground,
      descriptionForeground: `${colors[3].darken(0.6).hex()}`,
      errorForeground: `${colors[3].hex()}`,
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

  private getStandardColors(colors: Color[]) {
    const hslArrays = colors.map(color => color.hsl().array());
    return {
      background: Color.hsl([hslArrays[0][0], hslArrays[0][1], 8]).hex(),
      contrastBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 4]).hex(),
      trimBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 12]).hex(),
      borderBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 15]).hex(),
      foreground: Color.hsl([hslArrays[3][0], hslArrays[3][1], 80]).hex(),
      textForeground: Color.hsl([hslArrays[3][0], 90, 70]).hex(),
      comments: Color.hsl([hslArrays[0][0], 90, 40]).hex(),
      functions: Color.hsl([hslArrays[2][0], 90, 40]).hex(),
      keywords: Color.hsl([hslArrays[0][0], 100, 70]).hex(),
      numbers: Color.hsl([hslArrays[2][0], 90, 30]).hex(),
      strings: Color.hsl([hslArrays[1][0], 90, 60]).hex(),
      types: Color.hsl([hslArrays[1][0], 90, 40]).hex(),
      variables: Color.hsl([hslArrays[4][0], 90, 50]).hex(),
      booleans: Color.hsl([hslArrays[4][0], 90, 80]).hex(),
      modifiers: Color.hsl([hslArrays[1][0], 90, 80]).hex(),
      classKeyword: Color.hsl([hslArrays[3][0], 90, 60]).hex(),
      classNames: Color.hsl([hslArrays[2][0], 90, 60]).hex(),
      operators: Color.hsl([hslArrays[2][0], 90, 70]).hex(),
      newKeyword: Color.hsl([hslArrays[4][0], 90, 60]).hex(),
      properties: Color.hsl([hslArrays[2][0], 90, 70]).hex()
    };
  }
}
