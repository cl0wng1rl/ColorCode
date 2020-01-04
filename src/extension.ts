import * as vscode from "vscode";
import Theme from "./lib/Theme";
import ColorMind from "./lib/ColorMind";
import ThemeSettings from "./lib/ThemeSettings";

const SAVED_COLORS_KEY = "savedColors";
const CURRENT_COLORS_KEY = "currentColors";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateTheme", () => {
      ColorMind.getRandomColourPalette().then((colorStrings) => {
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        cacheCurrentColors(context, colorStrings);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.saveCurrentTheme", async () => {
      vscode.window.showInputBox({ placeHolder: "Enter a name for your theme..." }).then(async (value: any) => {
        if (!value) {
          return;
        }

        if (!await nameIsUnique(context, value)) {
          return vscode.window.showErrorMessage(`The name '${value}' is already taken`);
        }

        saveCurrentColors(context, value);
        vscode.window.showInformationMessage(`Theme '${value}' successfully saved`);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.loadTheme", async () => {
      const themeNames = await getSavedThemeNames(context);

      if (!themeNames.length) {
        return vscode.window.showInformationMessage(`You don't have any saved themes yet`);
      }

      vscode.window.showQuickPick(getSavedThemeNames(context)).then((value: any) => {
        if (value) {
          const colorStrings = loadColors(context, value);
          const settings = Theme.generateSettingsFromColorStrings(colorStrings);
          changeConfiguration(settings);
          cacheCurrentColors(context, colorStrings);
        }
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteTheme", async () => {
      const themeNames = await getSavedThemeNames(context);

      if (!themeNames.length) {
        return vscode.window.showInformationMessage(`You don't have any saved themes yet`);
      }

      await vscode.window.showQuickPick(themeNames).then((value: any) => {
        if (value) {
          return deleteTheme(context, value);
        }
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateThemeCode", () => {
      const colorStrings = context.globalState.get<Number[][]>(CURRENT_COLORS_KEY);
      if (!colorStrings) {
        return;
      }
      const COPY_LABEL = "Copy To Clipboard";
      const code = generateThemeCode(colorStrings);
      vscode.window.showInformationMessage(`Theme Code: ${code}`, COPY_LABEL).then((selection: any) => {
        if (selection === COPY_LABEL) {
          vscode.env.clipboard.writeText(code);
        }
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.readThemeCode", () => {
      vscode.window.showInputBox({ placeHolder: "Enter your code..." }).then((value: any) => {
        if (!value) {
          return;
        }

        if (!stringIsAThemeCode(value)) {
          return vscode.window.showInformationMessage(`That is not a valid theme code`);
        }

        const colorStrings = readThemeCode(value);
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        cacheCurrentColors(context, colorStrings);
      });
    })
  );
}

async function changeConfiguration(settings: ThemeSettings) {
  const workbenchConfig = await vscode.workspace.getConfiguration("workbench").colorCustomizations;
  const editorConfig = await vscode.workspace.getConfiguration("editor").tokenColorCustomizations;

  let newworkbenchConfig = Object.assign({}, workbenchConfig, {
    "[ColorCode]": settings.colorCustomizations
  });
  let neweditorConfig = Object.assign({}, editorConfig, {
    "[ColorCode]": settings.tokenColorCustomizations
  });

  await vscode.workspace.getConfiguration().update('workbench.colorCustomizations', newworkbenchConfig, vscode.ConfigurationTarget.Global);
  await vscode.workspace.getConfiguration().update('editor.tokenColorCustomizations', neweditorConfig, vscode.ConfigurationTarget.Global);
}

function saveColors(
  context: vscode.ExtensionContext,
  colorStrings: Number[][],
  name: string
): void {
  let savedColors = context.globalState.get(SAVED_COLORS_KEY, []);
  savedColors[name] = colorStrings;
  context.globalState.update(SAVED_COLORS_KEY, savedColors);
}

function cacheCurrentColors(context: vscode.ExtensionContext, colorStrings: Number[][]): void {
  context.globalState.update(CURRENT_COLORS_KEY, colorStrings);
}

function saveCurrentColors(context: vscode.ExtensionContext, name: string): void {
  const colorStrings = context.globalState.get(CURRENT_COLORS_KEY, []);
  saveColors(context, colorStrings, name);
}

function loadColors(context: vscode.ExtensionContext, name: string): Number[][] {
  const colors = context.globalState.get(SAVED_COLORS_KEY, []);
  vscode.window.showInformationMessage(`Theme '${name}' successfully loaded`);

  return colors;
}

function deleteTheme(context: vscode.ExtensionContext, name: string) {
  const savedColors = JSON.parse(JSON.stringify(context.globalState.get(SAVED_COLORS_KEY) || {}));
  delete savedColors[name];
  context.globalState.update(SAVED_COLORS_KEY, savedColors);
  vscode.window.showInformationMessage(`Theme '${name}' successfully deleted`);
}

function generateThemeCode(colorStrings: Number[][]): string {
  return colorStrings.map((color) => color.join("-")).join("/");
}

function readThemeCode(code: string): Number[][] {
  return code.split("/").map((color) => color.split("-").map((val) => Number.parseInt(val)));
}

async function getSavedThemeNames(context: vscode.ExtensionContext): Promise<string[]> {
  const savedColors = await context.globalState.get(SAVED_COLORS_KEY, {});

  return Object.keys(savedColors);
}

async function nameIsUnique(context: vscode.ExtensionContext, name: string): boolean {
  let names = await getSavedThemeNames(context);

  return !names.includes(name);
}

function stringIsAThemeCode(code: string): boolean {
  const splitCode = code.split("/");
  if (splitCode.length !== 5) {
    return false;
  }
  let validColors = true;
  splitCode.forEach((color) => {
    const values = color.split("-");
    if (values.length !== 3) {
      console.log(color);
      validColors = false;
    }
    values.forEach((v) => {
      const n = Number.parseInt(v);
      if (Number.isNaN(n) || n > 256) {
        console.log(v);
        validColors = false;
      }
    });
  });
  console.log(validColors);

  return validColors;
}

export function deactivate() { }
