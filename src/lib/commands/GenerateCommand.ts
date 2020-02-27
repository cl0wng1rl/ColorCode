import ColorMind from "../ColorMind";
import * as vscode from "vscode";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";
import Command from "./Command";

export default class GenerateCommand implements Command {
  private context: ExtensionContext;
  private resolved: boolean = false;
  private configuration: Configuration;

  public static getInstance(context: vscode.ExtensionContext): GenerateCommand {
    return new GenerateCommand(context);
  }

  private constructor(context: vscode.ExtensionContext) {
    this.context = new ExtensionContext(context);
    this.configuration = new Configuration(this.context);
  }

  public execute(): void {
    this.timeOutIfUnresolvedIn(5000);
    new ColorMind()
      .getRandomColorPalette()
      .then(this.setThemeWithColorStrings)
      .catch(this.showUnableToConnectMessage);
  }

  private setThemeWithColorStrings(colorStrings: number[][]): void {
    this.resolved = true;
    this.setThemeWithColorStrings(colorStrings);
    this.configuration.updateConfiguration(colorStrings);
  }

  private showUnableToConnectMessage() {
    vscode.window.showInformationMessage(`Unable to connect to Colormind.io`);
  }

  private timeOutIfUnresolvedIn(numberOfMilliseconds: number): void {
    setTimeout(() => {
      if (!this.resolved) {
        vscode.window.showInformationMessage("Trying to connect to Colormind.io...");
      }
    }, numberOfMilliseconds);
  }

  public static getTestingInstance(
    vscodeExtensionContext: vscode.ExtensionContext,
    context: ExtensionContext,
    configuration: Configuration
  ): GenerateCommand {
    const generateCommand = new GenerateCommand(vscodeExtensionContext);
    generateCommand.context = context;
    generateCommand.configuration = configuration;
    return generateCommand;
  }
}
