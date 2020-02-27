import * as vscode from "vscode";
import ExtensionContext from "../ExtensionContext";
import Command from "./Command";

export default class GenerateThemeCodeCommand implements Command {
  private context: ExtensionContext;

  public static getInstance(context: vscode.ExtensionContext) {
    return new GenerateThemeCodeCommand(context);
  }

  private constructor(context: vscode.ExtensionContext) {
    this.context = new ExtensionContext(context);
  }

  public execute(): void {
    const colorStrings = this.context.getCurrentColors();
    if (colorStrings) {
      const code = this.generateThemeCode(colorStrings);
      this.displayThemeCodeMessage(code);
    }
  }

  private displayThemeCodeMessage(code: string) {
    const COPY_LABEL = "Copy To Clipboard";
    vscode.window
      .showInformationMessage(`Theme Code: ${code}`, COPY_LABEL)
      .then((selection: any) => {
        if (selection === COPY_LABEL) {
          vscode.env.clipboard.writeText(code);
        }
      });
  }

  private generateThemeCode(colorStrings: number[][]): string {
    return colorStrings.map(color => color.join("-")).join("/");
  }

  public static getTestingInstance(
    vscodeExtensionContext: vscode.ExtensionContext,
    context: ExtensionContext
  ): GenerateThemeCodeCommand {
    const generateThemeCodeCommand = new GenerateThemeCodeCommand(vscodeExtensionContext);
    generateThemeCodeCommand.context = context;
    return generateThemeCodeCommand;
  }
}
