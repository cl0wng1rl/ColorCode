// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Theme from "./lib/Theme";
import ColorMind from "./lib/ColorMind";
import ThemeSettings from "./lib/ThemeSettings";

const defaultThemeName = "ColorCode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ColorCode" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateTheme", () => {
      // The code you place here will be executed every time your command is executed
      ColorMind.getRandomColourPalette().then(colorStrings => {
        const settings = Theme.generateSettingsFromColorStrings(colorStrings);
        changeConfiguration(settings);
        cacheCurrentColors(context, colorStrings);
      });
      // Display a message box to the user
      vscode.window.showInformationMessage("New Theme Generated!");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.saveCurrentTheme", async () => {
      // The code you place here will be executed every time your command is executed
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
      // Display a message box to the user
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
      // Display a message box to the user
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
      // Display a message box to the user
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
  let savedColors = JSON.parse(JSON.stringify(context.workspaceState.get("savedColors") || "{}"));
  savedColors[name] = colorStrings;
  context.workspaceState.update("savedColors", savedColors);
  vscode.window.showInformationMessage(`Theme '${name}' saved successfully`);
}

function cacheCurrentColors(context: vscode.ExtensionContext, colorStrings: string[]): void {
  context.workspaceState.update("currentColors", colorStrings);
}

function saveCurrentColors(context: vscode.ExtensionContext, name: string): void {
  const colorStrings = JSON.parse(
    JSON.stringify(context.workspaceState.get("currentColors") || "{}")
  );
  saveColors(context, colorStrings, name);
}

function loadColors(context: vscode.ExtensionContext, name: string): string[] {
  return JSON.parse(JSON.stringify(context.workspaceState.get("savedColors") || "{}"))[name];
}

function deleteTheme(context: vscode.ExtensionContext, name: string) {
  const savedColors = JSON.parse(JSON.stringify(context.workspaceState.get("savedColors") || "{}"));
  delete savedColors[name];
  context.workspaceState.update("savedColors", savedColors);
}

function getSavedThemeNames(context: vscode.ExtensionContext): string[] {
  const savedColors = JSON.parse(JSON.stringify(context.workspaceState.get("savedColors") || "{}"));
  return Object.keys(savedColors);
}

function nameIsUnique(context: vscode.ExtensionContext, name: string): boolean {
  return !getSavedThemeNames(context).includes(name);
}

// this method is called when your extension is deactivated
export function deactivate() {}
