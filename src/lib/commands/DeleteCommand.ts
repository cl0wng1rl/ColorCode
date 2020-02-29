import * as vscode from "vscode";
import Configuration from "../Configuration";
import Command from "./Command";
import VSCodeContext from "../VSCodeContext";

export default class DeleteCommand implements Command {
  private configuration: Configuration;

  public static getInstance(context: VSCodeContext): DeleteCommand {
    return new DeleteCommand(context);
  }

  private constructor(context: VSCodeContext) {
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    const themeNames = this.configuration.getSavedThemeNames();
    if (themeNames.length) {
      this.deleteThemeFromOptions(themeNames);
    }
  }

  private deleteThemeFromOptions(themeNames: string[]) {
    vscode.window.showQuickPick(themeNames).then(this.deleteThemeIfSelected);
  }

  private deleteThemeIfSelected(name: any) {
    if (name) {
      this.deleteTheme(name);
    }
  }

  private deleteTheme(name: string) {
    const savedColors = JSON.parse(JSON.stringify(this.configuration.getSavedColors()));
    delete savedColors[name];
    this.configuration.updateSavedColors(savedColors);
    vscode.window.showInformationMessage(`Theme '${name}' successfully deleted`);
  }
}
