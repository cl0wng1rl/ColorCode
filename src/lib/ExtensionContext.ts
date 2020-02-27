import * as vscode from "vscode";

export default class ExtensionContext {
  private static SAVED_COLORS_KEY = "savedColors";
  private static CURRENT_COLORS_KEY = "currentColors";

  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public getCurrentColors(): number[][] {
    return this.context.globalState.get<number[][]>(ExtensionContext.CURRENT_COLORS_KEY) || [];
  }

  public getSavedColors(): any {
    return this.context.globalState.get(ExtensionContext.SAVED_COLORS_KEY) || [];
  }

  public updateCurrentColors(colorStrings: number[][]): void {
    this.context.globalState.update(ExtensionContext.CURRENT_COLORS_KEY, colorStrings);
  }

  public updateSavedColors(colorStrings: number[][]): void {
    this.context.globalState.update(ExtensionContext.SAVED_COLORS_KEY, colorStrings);
  }
}
