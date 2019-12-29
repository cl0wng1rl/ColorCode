import * as vscode from "vscode";
import Theme from "./lib/Theme";
import ColorMind from "./lib/ColorMind";
import ThemeSettings from "./lib/ThemeSettings";

const SAVED_COLORS_KEY = "savedColors";
const CURRENT_COLORS_KEY = "currentColors";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ColorCode" is now active!');
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateTheme", () => {
      ColorMind.getRandomColourPalette().then(colorStrings => {
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        cacheCurrentColors(context, colorStrings);
      });
      vscode.window.showInformationMessage("New Theme Generated!");
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
      vscode.window.showQuickPick(getSavedThemeNames(context)).then(value => {
        if (!value) {
          return;
        }
        const colorStrings = loadColors(context, value);
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        vscode.window.showInformationMessage(`Theme '${value}' successfully loaded`);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteTheme", () => {
      vscode.window.showQuickPick(getSavedThemeNames(context)).then(value => {
        if (!value) {
          return;
        }
        deleteTheme(context, value);
        vscode.window.showInformationMessage(`Theme '${value}' successfully deleted`);
      });
    })
  );
}

async function changeConfiguration(settings: ThemeSettings) {
  const workbench = vscode.workspace.getConfiguration("workbench");
  const editor = vscode.workspace.getConfiguration("editor");
  await workbench.update(`colorCustomizations`, settings.colorCustomizations);
  await editor.update(`tokenColorCustomizations`, settings.tokenColorCustomizations);
}

function saveColors(context: vscode.ExtensionContext, colorStrings: string[], name: string): void {
  let savedColors = JSON.parse(
    JSON.stringify(context.workspaceState.get(SAVED_COLORS_KEY) || "{}")
  );
  savedColors[name] = colorStrings;
  context.workspaceState.update(SAVED_COLORS_KEY, savedColors);
  vscode.window.showInformationMessage(`Theme '${name}' saved successfully`);
}

function cacheCurrentColors(context: vscode.ExtensionContext, colorStrings: string[]): void {
  context.workspaceState.update(CURRENT_COLORS_KEY, colorStrings);
}

function saveCurrentColors(context: vscode.ExtensionContext, name: string): void {
  const colorStrings = JSON.parse(
    JSON.stringify(context.workspaceState.get(CURRENT_COLORS_KEY) || "{}")
  );
  saveColors(context, colorStrings, name);
}

function loadColors(context: vscode.ExtensionContext, name: string): string[] {
  return JSON.parse(JSON.stringify(context.workspaceState.get(SAVED_COLORS_KEY) || "{}"))[name];
}

function deleteTheme(context: vscode.ExtensionContext, name: string) {
  const savedColors = JSON.parse(
    JSON.stringify(context.workspaceState.get(SAVED_COLORS_KEY) || "{}")
  );
  delete savedColors[name];
  context.workspaceState.update(SAVED_COLORS_KEY, savedColors);
}

function getSavedThemeNames(context: vscode.ExtensionContext): string[] {
  const savedColors = JSON.parse(
    JSON.stringify(context.workspaceState.get(SAVED_COLORS_KEY) || "{}")
  );
  return Object.keys(savedColors);
}

function nameIsUnique(context: vscode.ExtensionContext, name: string): boolean {
  return !getSavedThemeNames(context).includes(name);
}

export function deactivate() {}
