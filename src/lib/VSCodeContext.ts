import * as vscode from "vscode";
import Configuration from "./Configuration";
import ExtensionContext from "./ExtensionContext";

export default class VSCodeContext implements ExtensionContext {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public readonly GlobalConfigurationTarget: any = vscode.ConfigurationTarget.Global;
  public readonly globalState = {
    getCurrent: (s: string) => this.context.globalState.get<number[][]>(s),
    getSaved: (s: string) => this.context.globalState.get(s),
    update: (k: string, v: string) => this.context.globalState.update(k, v),
  };
  public readonly getExtensionConfiguration: any = vscode.workspace.getConfiguration;
  public readonly showInformationMessage: any = vscode.window.showInformationMessage;
  public readonly showQuickPick: any = vscode.window.showQuickPick;
  public readonly showInputBox: any = vscode.window.showInputBox;

  public writeToClipboard(text: string): any {
    vscode.env.clipboard.writeText(text);
  }

  public getConfiguration(): Configuration {
    return new Configuration(this);
  }
}
