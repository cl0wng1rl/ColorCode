import Command from "./Command";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";

export default class GenerateThemeCodeCommand implements Command {
  private context: ExtensionContext;
  private configuration: Configuration;

  public static getInstance(context: ExtensionContext) {
    return new GenerateThemeCodeCommand(context);
  }

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    const colorStrings = this.configuration.getCurrentColors();
    if (colorStrings) {
      const code = this.generateThemeCode(colorStrings);
      this.displayThemeCodeMessage(code);
    }
  }

  private displayThemeCodeMessage(code: string) {
    const COPY_LABEL = "Copy To Clipboard";
    this.context
      .showInformationMessage(`Theme Code: ${code}`, COPY_LABEL)
      .then((selection: any) => {
        if (selection === COPY_LABEL) {
          this.context.writeToClipboard(code);
        }
      });
  }

  private generateThemeCode(colorStrings: number[][]): string {
    return colorStrings.map(color => color.join("-")).join("/");
  }
}
