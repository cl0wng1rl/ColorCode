import * as Color from "color";
import ThemeSettings from "./ThemeSettings";
import WorkbenchTheme from "./WorkbenchTheme";
import EditorTheme from "./EditorTheme";

export default class Theme {
  public generateSettingsFromColorStrings(colorStrings: number[][]): ThemeSettings {
    const colors = this.saturateColors(this.getColorsFromColorStrings(colorStrings));
    const standardColors = this.getStandardColors(colors);
    const jsonWorkbenchTheme = new WorkbenchTheme(standardColors).getTheme();
    const jsonEditorTheme = new EditorTheme(standardColors).getTheme();
    return new ThemeSettings(jsonWorkbenchTheme, jsonEditorTheme);
  }

  private getColorsFromColorStrings(colorStrings: number[][]): Color[] {
    return colorStrings.map((c) => Color.rgb(c));
  }

  private saturateColors(colors: Color[]): Color[] {
    return colors.map((color) => color.saturate(0.6));
  }

  private getStandardColors(colors: Color[]): { [index: string]: string } {
    const hslArrays = colors.map((color) => color.hsl().array());
    return {
      background: Color.hsl([hslArrays[0][0], hslArrays[0][1], 8]).hex(),
      contrastBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 4]).hex(),
      trimBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 12]).hex(),
      borderBackground: Color.hsl([hslArrays[0][0], hslArrays[0][1], 15]).hex(),
      foreground: Color.hsl([hslArrays[3][0], hslArrays[3][1], 80]).hex(),
      descriptionForeground: Color.hsl(hslArrays[3]).darken(0.6).hex(),
      textForeground: Color.hsl([hslArrays[3][0], 90, 70]).hex(),
      comments: Color.hsl([hslArrays[0][0], 90, 40]).hex(),
      functions: Color.hsl([hslArrays[2][0], 100, 40]).hex(),
      keywords: Color.hsl([hslArrays[0][0], 100, 70]).hex(),
      numbers: Color.hsl([hslArrays[2][0], 100, 40]).hex(),
      strings: Color.hsl([hslArrays[1][0], 90, 60]).hex(),
      types: Color.hsl([hslArrays[1][0], 90, 40]).hex(),
      variables: Color.hsl([hslArrays[4][0], 95, 50]).hex(),
      booleans: Color.hsl([hslArrays[4][0], 100, 80]).hex(),
      modifiers: Color.hsl([hslArrays[1][0], 90, 80]).hex(),
      classKeyword: Color.hsl([hslArrays[3][0], 90, 60]).hex(),
      classNames: Color.hsl([hslArrays[2][0], 90, 60]).hex(),
      operators: Color.hsl([hslArrays[2][0], 90, 70]).hex(),
      newKeyword: Color.hsl([hslArrays[4][0], 100, 60]).hex(),
      properties: Color.hsl([hslArrays[2][0], 90, 70]).hex(),
    };
  }
}
