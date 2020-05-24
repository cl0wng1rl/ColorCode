import Configuration from "../Configuration";
import Command from "./Command";
import ExtensionContext from "../ExtensionContext";

export default class ReadThemeCodeCommand implements Command {
  private context: ExtensionContext;
  private configuration: Configuration;

  public static getInstance(context: ExtensionContext): ReadThemeCodeCommand {
    return new ReadThemeCodeCommand(context);
  }

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    this.context.showInputBox({ placeHolder: "Enter your code..." }).then(this.readThemeCode);
  }

  private readThemeCode = (code: any) => {
    const colorStrings = this.configuration.getColorsFromCode(code);
    if (colorStrings.length) {
      this.setThemeWithColorStrings(colorStrings);
    }
  };

  private setThemeWithColorStrings(colorStrings: number[][]): void {
    this.configuration.updateConfiguration(colorStrings);
  }
}
