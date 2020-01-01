import * as vscode from "vscode";
import Theme from "./lib/Theme";
import ColorMind from "./lib/ColorMind";
import ThemeSettings from "./lib/ThemeSettings";

const SAVED_COLORS_KEY = "savedColors";
const CURRENT_COLORS_KEY = "currentColors";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateTheme", () => {
      ColorMind.getRandomColourPalette().then(colorStrings => {
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        cacheCurrentColors(context, colorStrings);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.saveCurrentTheme", async () => {
      vscode.window.showInputBox({ placeHolder: "Enter a name for your theme..." }).then(value => {
        if (!value) {
          return;
        }

        if (!nameIsUnique(context, value)) {
          vscode.window.showErrorMessage(`The name '${value}' is already taken`);
          return;
        }

        saveCurrentColors(context, value);
        vscode.window.showInformationMessage(`Theme '${value}' successfully saved`);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.loadTheme", () => {
      const themeNames = getSavedThemeNames(context);
      if (!themeNames.length) {
        vscode.window.showInformationMessage(`You don't have any saved themes yet`);
        return;
      }
      vscode.window.showQuickPick(getSavedThemeNames(context)).then(value => {
        if (!value) {
          return;
        }
        const colorStrings = loadColors(context, value);
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        cacheCurrentColors(context, colorStrings);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteTheme", () => {
      const themeNames = getSavedThemeNames(context);
      if (!themeNames.length) {
        vscode.window.showInformationMessage(`You don't have any saved themes yet`);
        return;
      }
      vscode.window.showQuickPick(themeNames).then(value => {
        if (!value) {
          return;
        }
        deleteTheme(context, value);
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
      vscode.window.showInformationMessage(`Theme Code: ${code}`, COPY_LABEL).then(selection => {
        if (selection === COPY_LABEL) {
          vscode.env.clipboard.writeText(code);
        }
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.readThemeCode", () => {
      vscode.window.showInputBox({ placeHolder: "Enter your code..." }).then(value => {
        if (!value) {
          return;
        }
        const colorStrings = readThemeCode(value);
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
      });
    })
  );
}

async function changeConfiguration(settings: ThemeSettings) {
  const workbench = vscode.workspace.getConfiguration("workbench");
  const editor = vscode.workspace.getConfiguration("editor");
  await workbench.update(
    `colorCustomizations`,
    settings.colorCustomizations,
    vscode.ConfigurationTarget.Global
  );
  await editor.update(
    `tokenColorCustomizations`,
    settings.tokenColorCustomizations,
    vscode.ConfigurationTarget.Global
  );
}

function saveColors(
  context: vscode.ExtensionContext,
  colorStrings: Number[][],
  name: string
): void {
  let savedColors = JSON.parse(JSON.stringify(context.globalState.get(SAVED_COLORS_KEY) || {}));
  savedColors[name] = colorStrings;
  context.globalState.update(SAVED_COLORS_KEY, savedColors);
}

function cacheCurrentColors(context: vscode.ExtensionContext, colorStrings: Number[][]): void {
  context.globalState.update(CURRENT_COLORS_KEY, colorStrings);
}

function saveCurrentColors(context: vscode.ExtensionContext, name: string): void {
  const colorStrings = JSON.parse(
    JSON.stringify(context.globalState.get(CURRENT_COLORS_KEY) || {})
  );
  saveColors(context, colorStrings, name);
}

function loadColors(context: vscode.ExtensionContext, name: string): Number[][] {
  const colors = JSON.parse(JSON.stringify(context.globalState.get(SAVED_COLORS_KEY) || {}))[name];
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
  return colorStrings.map(color => color.join("-")).join("/");
}

function readThemeCode(code: string): Number[][] {
  return code.split("/").map(color => color.split("-").map(val => Number.parseInt(val)));
}

function getSavedThemeNames(context: vscode.ExtensionContext): string[] {
  const savedColors = JSON.parse(JSON.stringify(context.globalState.get(SAVED_COLORS_KEY) || {}));
  return Object.keys(savedColors);
}

function nameIsUnique(context: vscode.ExtensionContext, name: string): boolean {
  return !getSavedThemeNames(context).includes(name);
}

export function deactivate() {}
