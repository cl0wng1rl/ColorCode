import Configuration from "../Configuration";
import InputValidator from "../InputValidator";
import Command from "./Command";
import VSCodeContext from "../VSCodeContext";

export default class ReadThemeCodeCommand implements Command {
  private context: VSCodeContext;
  private configuration: Configuration;
  private validator: InputValidator;

  public static getInstance(context: VSCodeContext): ReadThemeCodeCommand {
    return new ReadThemeCodeCommand(context);
  }

  private constructor(context: VSCodeContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
    this.validator = context.getInputValidator();
  }

  public execute(): void {
    this.context.showInputBox({ placeHolder: "Enter your code..." }).then(this.readThemeCode);
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
}
