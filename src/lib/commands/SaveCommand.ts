import * as vscode from "vscode";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";
import InputValidator from "../InputValidator";
import Command from "./Command";

export default class SaveCommand implements Command {
  private context: ExtensionContext;
  private configuration: Configuration;
  private validator: InputValidator;

  public static getInstance(context: vscode.ExtensionContext): SaveCommand {
    return new SaveCommand(context);
  }

  private constructor(context: vscode.ExtensionContext) {
    this.context = new ExtensionContext(context);
    this.configuration = new Configuration(this.context);
    this.validator = new InputValidator();
  }

  public execute(): void {
    vscode.window
      .showInputBox({ placeHolder: "Enter a name for your theme..." })
      .then(this.saveColorsIfNameIsValid);
  }

  private saveColorsIfNameIsValid(value: any) {
    const currentNames: string[] = this.configuration.getSavedThemeNames();
    this.validator.validateName(value, currentNames);
    if (this.validator.isValid()) {
      this.saveCurrentColors(value);
      vscode.window.showInformationMessage(`Theme '${value}' successfully saved`);
    }
  }

  private saveCurrentColors(name: string): void {
    const currentColors = this.context.getCurrentColors();
    this.saveColors(currentColors, name);
  }

  private saveColors(colorStrings: number[][], name: string): void {
    let savedColors = this.context.getSavedColors();
    savedColors[name] = colorStrings;
    this.context.updateSavedColors(savedColors);
  }

  public static getTestingInstance(
    vscodeExtensionContext: vscode.ExtensionContext,
    context: ExtensionContext,
    configuration: Configuration,
    validator: InputValidator
  ): SaveCommand {
    const saveCommand = new SaveCommand(vscodeExtensionContext);
    saveCommand.context = context;
    saveCommand.configuration = configuration;
    saveCommand.validator = validator;
    return saveCommand;
  }
}
