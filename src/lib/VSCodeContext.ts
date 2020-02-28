import * as vscode from "vscode";
import Configuration from "./Configuration";
import InputValidator from "./InputValidator";

export default class VSCodeContext {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public readonly GlobalConfigurationTarget = vscode.ConfigurationTarget.Global;
  public readonly globalState = this.context.globalState;
  public readonly getExtensionConfiguration = vscode.workspace.getConfiguration;
  public readonly showInformationMessage = vscode.window.showInformationMessage;
  public readonly showQuickPick = vscode.window.showQuickPick;
  public readonly showInputBox = vscode.window.showInputBox;
  public readonly writeToClipboard = vscode.env.clipboard.writeText;

  public getConfiguration(): Configuration {
    return new Configuration(this);
  }

  public getInputValidator(): InputValidator {
    return new InputValidator(this);
  }
}
