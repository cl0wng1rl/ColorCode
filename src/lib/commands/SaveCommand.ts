import Configuration from "../Configuration";
import Command from "./Command";
import ExtensionContext from "../ExtensionContext";

export default class SaveCommand implements Command {
  private context: ExtensionContext;
  private configuration: Configuration;

  public static getInstance(context: ExtensionContext): SaveCommand {
    return new SaveCommand(context);
  }

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    this.context
      .showInputBox({ placeHolder: "Enter a name for your theme..." })
      .then(this.saveColorsIfNameIsValid);
  }

  private saveColorsIfNameIsValid = (value: any) => {
    const currentNames = this.configuration.getSavedThemeNames();
    if (currentNames.length) {
      this.saveCurrentColors(value);
      this.context.showInformationMessage(`Theme '${value}' successfully saved`);
    }
  };

  private saveCurrentColors(name: string): void {
    const currentColors = this.configuration.getCurrentColors();
    this.saveColors(currentColors, name);
  }

  private saveColors(colorStrings: number[][], name: string): void {
    let savedColors = this.configuration.getSavedThemesOrEmptyObject();
    savedColors[name] = colorStrings;
    this.configuration.updateSavedColors(savedColors);
  }
}
