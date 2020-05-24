import * as vscode from "vscode";
import CommandSet from "./lib/commands/CommandSet";
import VSCodeContext from "./lib/VSCodeContext";

export function activate(context: vscode.ExtensionContext) {
  const vsCodeContext = new VSCodeContext(context);
  const commands: CommandSet = new CommandSet(vsCodeContext);

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateTheme", commands.generate)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.saveCurrentTheme", commands.save)
  );

  context.subscriptions.push(vscode.commands.registerCommand("extension.loadTheme", commands.load));

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.deleteTheme", commands.delete)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.generateThemeCode", commands.generateThemeCode)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.readThemeCode", commands.readThemeCode)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.generateThemeFromCategory",
      commands.generateThemeFromCategory
    )
  );
}
export function deactivate() {}
