import * as vscode from "vscode";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";
import InputValidator from "../InputValidator";
import Command from "./Command";

export default class ReadThemeCodeCommand implements Command {
  private configuration: Configuration;
  private validator: InputValidator;

  public static getInstance(context: ExtensionContext): ReadThemeCodeCommand {
    return new ReadThemeCodeCommand(context);
  }

  private constructor(extensionContext: ExtensionContext) {
    this.configuration = new Configuration(extensionContext);
    this.validator = new InputValidator();
  }

  public execute(): void {
    vscode.window.showInputBox({ placeHolder: "Enter your code..." }).then(this.readThemeCode);
  }

  private readThemeCode(code: any) {
    this.validator.validateThemeCode(code);
    if (this.validator.isValid()) {
      const colorStrings = this.getColorsFromCode(code);
      this.setThemeWithColorStrings(colorStrings);
    }
  }

  private getColorsFromCode(code: string): number[][] {
    return code.split("/").map(color => color.split("-").map(val => Number.parseInt(val)));
  }

  private setThemeWithColorStrings(colorStrings: number[][]): void {
    this.configuration.updateConfiguration(colorStrings);
  }

  public static getTestingInstance(
    context: ExtensionContext,
    configuration: Configuration,
    validator: InputValidator
  ): ReadThemeCodeCommand {
    const rtcc = new ReadThemeCodeCommand(context);
    rtcc.configuration = configuration;
    rtcc.validator = validator;
    return rtcc;
  }
}
