import Theme from "./Theme";
import ThemeSettings from "./ThemeSettings";
import ExtensionContext from "./ExtensionContext";
import InputValidator from "./InputValidator";

export default class Configuration {
  private static SAVED_COLORS_KEY = "savedColors";
  private static CURRENT_COLORS_KEY = "currentColors";

  private context: ExtensionContext;
  private validator: InputValidator;
  private editorConfig: any;
  private workbenchConfig: any;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.validator = new InputValidator(context);
    this.editorConfig = context.getExtensionConfiguration("editor");
    this.workbenchConfig = context.getExtensionConfiguration("workbench");
  }

  public getSavedThemeNames(): string[] {
    return Object.keys(this.getSavedThemesOrEmptyObject());
  }

  public getCurrentColors(): number[][] {
    return this.context.globalState.getCurrent(Configuration.CURRENT_COLORS_KEY) || [];
  }

  public getSavedThemes(): any {
    const savedColors = this.getSavedThemesOrEmptyObject();
    this.validator.validateSavedThemes(Object.keys(savedColors));
    return this.validator.isValid() ? savedColors : {};
  }

  public getSavedThemesOrEmptyObject(): any {
    return this.context.globalState.getSaved(Configuration.SAVED_COLORS_KEY) || {};
  }

  public getColorsFromCode(code: any): number[][] {
    this.validator.validateThemeCode(code);
    return this.validator.isValid() ? this.getColorsFromValidCode(code) : [];
  }

  public updateConfiguration(colorStrings: number[][]) {
    const theme = new Theme();
    const settings = theme.generateSettingsFromColorStrings(colorStrings);
    this.updateEditorConfig(settings);
    this.updateWorkbenchConfig(settings);
    this.updateCurrentColors(colorStrings);
  }

  public updateSavedColors(colorStrings: number[][]): void {
    this.context.globalState.update(Configuration.SAVED_COLORS_KEY, colorStrings);
  }

  private updateCurrentColors(colorStrings: number[][]): void {
    this.context.globalState.update(Configuration.CURRENT_COLORS_KEY, colorStrings);
  }

  private updateEditorConfig(settings: ThemeSettings): void {
    const newEditorConfig = this.getNewEditorConfig(settings);
    this.editorConfig.update(
      "tokenColorCustomizations",
      newEditorConfig,
      this.context.GlobalConfigurationTarget
    );
  }

  private updateWorkbenchConfig(settings: ThemeSettings): void {
    const newWorkbenchConfig = this.getNewWorkbenchConfig(settings);
    this.workbenchConfig.update(
      "colorCustomizations",
      newWorkbenchConfig,
      this.context.GlobalConfigurationTarget
    );
  }

  private getNewEditorConfig(settings: ThemeSettings) {
    return Object.assign({}, this.editorConfig.get("tokenColorCustomizations"), {
      "[ColorCode]": settings.tokenColorCustomizations,
    });
  }

  private getNewWorkbenchConfig(settings: ThemeSettings) {
    return Object.assign({}, this.workbenchConfig.get("tokenColorCustomizations"), {
      "[ColorCode]": settings.colorCustomizations,
    });
  }

  private getColorsFromValidCode(code: string): number[][] {
    return code.split("/").map((color) => color.split("-").map((val) => Number.parseInt(val)));
  }
}
