import GenerateCommand from "./GenerateCommand";
import SaveCommand from "./SaveCommand";
import LoadCommand from "./LoadCommand";
import DeleteCommand from "./DeleteCommand";
import GenerateThemeCodeCommand from "./GenerateThemeCodeCommand";
import ReadThemeCodeCommand from "./ReadThemeCodeCommand";
import GenerateThemeFromCategoryCommand from "./GenerateThemeFromCategoryCommand";
import ExtensionContext from "../ExtensionContext";

export default class CommandSet {
  private generateCommand: GenerateCommand;
  private saveCommand: SaveCommand;
  private loadCommand: LoadCommand;
  private deleteCommand: DeleteCommand;
  private generateThemeCodeCommand: GenerateThemeCodeCommand;
  private readThemeCodeCommand: ReadThemeCodeCommand;
  private generateThemeFromCategoryCommand: GenerateThemeFromCategoryCommand;

  constructor(context: ExtensionContext) {
    this.generateCommand = GenerateCommand.getInstance(context);
    this.saveCommand = SaveCommand.getInstance(context);
    this.loadCommand = LoadCommand.getInstance(context);
    this.deleteCommand = DeleteCommand.getInstance(context);
    this.generateThemeCodeCommand = GenerateThemeCodeCommand.getInstance(context);
    this.readThemeCodeCommand = ReadThemeCodeCommand.getInstance(context);
    this.generateThemeFromCategoryCommand = GenerateThemeFromCategoryCommand.getInstance(context);
  }

  public generate = (): void => {
    this.generateCommand.execute();
  };

  public save = (): void => {
    this.saveCommand.execute();
  };

  public load = (): void => {
    this.loadCommand.execute();
  };

  public delete = (): void => {
    this.deleteCommand.execute();
  };

  public generateThemeCode = (): void => {
    this.generateThemeCodeCommand.execute();
  };

  public readThemeCode = (): void => {
    this.readThemeCodeCommand.execute();
  };

  public generateThemeFromCategory = (): void => {
    this.generateThemeFromCategoryCommand.execute();
  };
}
