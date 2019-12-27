// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import Theme from "./lib/Theme";
import ColorMind from "./lib/ColorMind";
import { readFileSync, writeFileSync, existsSync, fstat } from "fs";
import ThemeSettings from "./lib/ThemeSettings";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "colorcode" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("extension.generateTheme", () => {
    // The code you place here will be executed every time your command is executed

    ColorMind.getRandomColourPalette().then(colorStrings => {
      const settings = Theme.generateSettingsFromColorStrings(colorStrings);
      updateStuff(settings);
    });
    // Display a message box to the user

    vscode.window.showInformationMessage("New Theme Generated!");
  });

  context.subscriptions.push(disposable);
}

async function updateStuff(settings: ThemeSettings) {
  const workbench = vscode.workspace.getConfiguration("workbench");
  await workbench.update("colorCustomizations", settings.colorCustomizations);
  const editor = vscode.workspace.getConfiguration("editor");
  await editor.update("tokenColorCustomizations", settings.tokenColorCustomizations);
}

// this method is called when your extension is deactivated
export function deactivate() {}
