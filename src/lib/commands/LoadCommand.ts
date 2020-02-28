import Configuration from "../Configuration";
import InputValidator from "../InputValidator";
import Command from "./Command";
import VSCodeContext from "../VSCodeContext";

export default class LoadCommand implements Command {
  private context: VSCodeContext;
  private configuration: Configuration;
  private validator: InputValidator;

  public static getInstance(context: VSCodeContext): LoadCommand {
    return new LoadCommand(context);
  }

  private constructor(context: VSCodeContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
    this.validator = context.getInputValidator();
  }

  public execute(): void {
    const themeNames = this.configuration.getSavedThemeNames();
    this.validator.validateSavedThemes(themeNames);
    if (this.validator.isValid()) {
      this.pickTheme(themeNames);
    }
  }

  private pickTheme(themeNames: string[]) {
    this.context.showQuickPick(themeNames).then(this.setTheme);
  }

  private setTheme(themeName: any): void {
    if (themeName) {
      const colorStrings = this.getColorsByName(themeName);
      this.configuration.updateConfiguration(colorStrings);
    }
  }

  private getColorsByName(name: string): number[][] {
    const colors = this.configuration.getSavedColors();
    this.context.showInformationMessage(`Theme '${name}' successfully loaded`);
    return colors[name];
  }
}
