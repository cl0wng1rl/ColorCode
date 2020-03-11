import Configuration from "../Configuration";
import Command from "./Command";
import VSCodeContext from "../VSCodeContext";

export default class DeleteCommand implements Command {
  private context: VSCodeContext;
  private configuration: Configuration;

  public static getInstance(context: VSCodeContext): DeleteCommand {
    return new DeleteCommand(context);
  }

  private constructor(context: VSCodeContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    const themeNames = this.configuration.getSavedThemeNames();
    if (themeNames.length) {
      this.deleteThemeFromOptions(themeNames);
    }
  }

  private deleteThemeFromOptions(themeNames: string[]) {
    this.context.showQuickPick(themeNames).then(this.deleteThemeIfSelected);
  }

  private deleteThemeIfSelected(name: any) {
    if (name) {
      this.deleteTheme(name);
    }
  }

  private deleteTheme(name: string) {
    // TODO: Remove JSON.parse(JSON.stringify(x)) if possible
    const savedColors = JSON.parse(JSON.stringify(this.configuration.getSavedColors()));
    delete savedColors[name];
    this.configuration.updateSavedColors(savedColors);
    this.context.showInformationMessage(`Theme '${name}' successfully deleted`);
  }
}
