import Configuration from "../Configuration";
import Command from "./Command";
import VSCodeContext from "../VSCodeContext";

export default class LoadCommand implements Command {
  private context: VSCodeContext;
  private configuration: Configuration;

  public static getInstance(context: VSCodeContext): LoadCommand {
    return new LoadCommand(context);
  }

  private constructor(context: VSCodeContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    const themeNames = this.configuration.getSavedThemeNames();
    if (themeNames.length) {
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
