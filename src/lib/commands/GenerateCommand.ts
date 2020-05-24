import ColorMind from "../ColorMind";
import Configuration from "../Configuration";
import Command from "./Command";
import ExtensionContext from "../ExtensionContext";

export default class GenerateCommand implements Command {
  private configuration: Configuration;
  private context: ExtensionContext;
  private resolved: boolean = false;

  public static getInstance(context: ExtensionContext): GenerateCommand {
    return new GenerateCommand(context);
  }

  private constructor(context: ExtensionContext) {
    this.context = context;
    this.configuration = context.getConfiguration();
  }

  public execute(): void {
    // this.timeOutIfUnresolvedIn(5000);
    new ColorMind()
      .getRandomColorPalette()
      .then(this.setThemeWithColorStrings)
      .catch(this.showUnableToConnectMessage);
  }

  private setThemeWithColorStrings = (colorStrings: number[][]): void => {
    // this.resolved = true;
    this.configuration.updateConfiguration(colorStrings);
  };

  private showUnableToConnectMessage = () => {
    this.context.showInformationMessage(`Unable to connect to Colormind.io`);
  };

  private timeOutIfUnresolvedIn(numberOfMilliseconds: number): void {
    setTimeout(() => {
      if (!this.resolved) {
        this.context.showInformationMessage("Trying to connect to Colormind.io...");
      }
    }, numberOfMilliseconds);
  }
}
