import Configuration from "../Configuration";
import Command from "./Command";
import VSCodeContext from "../VSCodeContext";

export default class ReadThemeCodeCommand implements Command {
  private context: VSCodeContext;
  private configuration: Configuration;

  public static getInstance(context: VSCodeContext): ReadThemeCodeCommand {
    return new ReadThemeCodeCommand(context);
  }

  private constructor(context: VSCodeContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    this.context.showInputBox({ placeHolder: "Enter your code..." }).then(this.readThemeCode);
  }

  private readThemeCode(code: any) {
    const colorStrings = this.configuration.getColorsFromCode(code);
    if (colorStrings.length) {
      this.setThemeWithColorStrings(colorStrings);
    }
  }

  private setThemeWithColorStrings(colorStrings: number[][]): void {
    this.configuration.updateConfiguration(colorStrings);
  }
}
