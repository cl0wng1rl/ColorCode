import Configuration from "./Configuration";

export default interface ExtensionContext {
  readonly GlobalConfigurationTarget: any;
  readonly globalState: {
    getCurrent: (s: string) => number[][] | undefined;
    getSaved: (s: string) => any;
    update: (key: string, value: any) => any;
  };
  readonly getExtensionConfiguration: any;
  readonly showInformationMessage: any;
  readonly showQuickPick: any;
  readonly showInputBox: any;
  readonly writeToClipboard: any;

  getConfiguration(): Configuration;
}
