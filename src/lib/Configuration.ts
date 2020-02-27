import * as vscode from "vscode";
import Theme from "./Theme";
import ThemeSettings from "./ThemeSettings";
import ExtensionContext from "./ExtensionContext";

export default class Configuration {
  private context: ExtensionContext;
  private editorConfig: vscode.WorkspaceConfiguration;
  private workbenchConfig: vscode.WorkspaceConfiguration;
  constructor(context: ExtensionContext) {
    this.context = context;
    this.editorConfig = this.getEditorConfig();
    this.workbenchConfig = this.getWorkbenchConfig();
  }

  public updateConfiguration(colorStrings: number[][]) {
    const theme = new Theme();
    const settings = theme.generateSettingsFromColorStrings(colorStrings);
    this.updateEditorConfig(settings);
    this.updateWorkbenchConfig(settings);
    this.cacheCurrentColors(colorStrings);
  }

  public getSavedThemeNames(): string[] {
    const savedColors = this.context.getCurrentColors();
    return Object.keys(savedColors);
  }

  private getEditorConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("editor");
  }

  private getWorkbenchConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("workbench");
  }

  private updateEditorConfig(settings: ThemeSettings): void {
    const newEditorConfig = this.getNewEditorConfig(settings);
    this.editorConfig.update(
      "tokenColorCustomizations",
      newEditorConfig,
      vscode.ConfigurationTarget.Global
    );
  }

  private updateWorkbenchConfig(settings: ThemeSettings): void {
    const newWorkbenchConfig = this.getNewWorkbenchConfig(settings);
    this.workbenchConfig.update(
      "colorCustomizations",
      newWorkbenchConfig,
      vscode.ConfigurationTarget.Global
    );
  }

  private getNewEditorConfig(settings: ThemeSettings) {
    return Object.assign({}, this.editorConfig.get("tokenColorCustomizations"), {
      "[ColorCode]": settings.tokenColorCustomizations
    });
  }

  private getNewWorkbenchConfig(settings: ThemeSettings) {
    return Object.assign({}, this.workbenchConfig.get("tokenColorCustomizations"), {
      "[ColorCode]": settings.colorCustomizations
    });
  }

  private cacheCurrentColors(colorStrings: number[][]): void {
    this.context.updateCurrentColors(colorStrings);
  }
}
