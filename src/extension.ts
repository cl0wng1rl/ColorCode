import * as vscode from "vscode";
import CommandSet from "./lib/commands/CommandSet";

export function activate(context: vscode.ExtensionContext) {
  const commands: CommandSet = new CommandSet(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateTheme", () => commands.generate())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.saveCurrentTheme", async () => commands.save())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.loadTheme", async () => commands.load())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteTheme", async () => commands.delete())
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateThemeCode", () =>
      commands.generateThemeCode()
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.readThemeCode", () => commands.readThemeCode())
  );
}
export function deactivate() {}
