import * as vscode from "vscode";
import GenerateCommand from "./GenerateCommand";
import SaveCommand from "./SaveCommand";
import LoadCommand from "./LoadCommand";
import DeleteCommand from "./DeleteCommand";
import GenerateThemeCodeCommand from "./GenerateThemeCodeCommand";
import ReadThemeCodeCommand from "./ReadThemeCodeCommand";
import ExtensionContext from "../ExtensionContext";
import Configuration from "../Configuration";

export default class CommandSet {
  private generateCommand: GenerateCommand;
  private saveCommand: SaveCommand;
  private loadCommand: LoadCommand;
  private deleteCommand: DeleteCommand;
  private generateThemeCodeCommand: GenerateThemeCodeCommand;
  private readThemeCodeCommand: ReadThemeCodeCommand;

  constructor(vsCodeExtensionContext: vscode.ExtensionContext) {
    this.generateCommand = GenerateCommand.getInstance(vsCodeExtensionContext);
    this.saveCommand = SaveCommand.getInstance(vsCodeExtensionContext);
    this.loadCommand = LoadCommand.getInstance(vsCodeExtensionContext);
    this.deleteCommand = DeleteCommand.getInstance(vsCodeExtensionContext);
    this.generateThemeCodeCommand = GenerateThemeCodeCommand.getInstance(vsCodeExtensionContext);
    this.readThemeCodeCommand = ReadThemeCodeCommand.getInstance(vsCodeExtensionContext);
  }

  public generate(): void {
    this.generateCommand.execute();
  }

  public save(): void {
    this.saveCommand.execute();
  }

  public load(): void {
    this.loadCommand.execute();
  }

  public delete(): void {
    this.deleteCommand.execute();
  }

  public generateThemeCode(): void {
    this.generateThemeCodeCommand.execute();
  }

  public readThemeCode(): void {
    this.readThemeCodeCommand.execute();
  }
}
