import Command from "./Command";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";
import ColorMind from "../ColorMind";

export default class GenerateThemeFromCategoryCommand implements Command {
  private context: ExtensionContext;
  private configuration: Configuration;

  public static getInstance(context: ExtensionContext) {
    return new GenerateThemeFromCategoryCommand(context);
  }

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    const categories = new ColorMind().getModels().then(this.selectModelAndSetColorsBasedOnModel);
  }

  private selectModelAndSetColorsBasedOnModel = (names: string[]) => {
    names = this.formatNames(names);
    this.context.showQuickPick(names).then(this.setColorsBasedOnModel);
  };

  private formatNames(names: string[]): string[] {
    return names.map((name) =>
      name
        .split("_")
        .map((w) => w[0].toUpperCase() + w.substr(1))
        .join(" ")
    );
  }

  private deformatName(name: string): string {
    return name.split(" ").join("_").toLowerCase();
  }

  private setColorsBasedOnModel = (model: string) => {
    if (model) {
      new ColorMind().getRandomColorPalette(this.deformatName(model)).then(this.setTheme);
    }
  };

  private setTheme = (colorStrings: any) => {
    this.configuration.updateConfiguration(colorStrings);
  };
}
