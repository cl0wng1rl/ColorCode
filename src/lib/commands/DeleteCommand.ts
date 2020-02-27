import * as vscode from "vscode";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";
import InputValidator from "../InputValidator";
import Command from "./Command";

export default class DeleteCommand implements Command {
  private context: ExtensionContext;
  private configuration: Configuration;
  private validator: InputValidator;

  public static getInstance(context: ExtensionContext): DeleteCommand {
    return new DeleteCommand(context);
  }

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.configuration = new Configuration(context);
    this.validator = new InputValidator();
  }

  public execute(): void {
    const themeNames = this.configuration.getSavedThemeNames();
    this.validator.validateSavedThemes(themeNames);
    if (this.validator.isValid()) {
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
    const savedColors = JSON.parse(JSON.stringify(this.context.getSavedColors() || {}));
    delete savedColors[name];
    this.context.updateSavedColors(savedColors);
    vscode.window.showInformationMessage(`Theme '${name}' successfully deleted`);
  }

  public static getTestingInstance(
    context: ExtensionContext,
    configuration: Configuration,
    validator: InputValidator
  ): DeleteCommand {
    const deleteCommand = new DeleteCommand(context);
    deleteCommand.context = context;
    deleteCommand.configuration = configuration;
    deleteCommand.validator = validator;
    return deleteCommand;
  }
}
