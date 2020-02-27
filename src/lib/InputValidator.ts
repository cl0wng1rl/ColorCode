import * as vscode from "vscode";

export default class InputValidator {
  private valid: boolean = false;

  public isValid(): boolean {
    return this.valid;
  }

  public validateName(name: any, currentNames: string[]): void {
    this.showErrorMessageBasedOnCondition(
      name,
      !this.nameIsUnique(name, currentNames),
      `The name '${name}' is already taken`
    );
  }

  public validateThemeCode(themeCode: any): void {
    this.showErrorMessageBasedOnCondition(
      themeCode,
      !this.stringIsAThemeCode(themeCode),
      `That is not a valid theme code`
    );
  }

  public validateSavedThemes(themeNames: string[]) {
    this.showErrorMessageBasedOnCondition(
      themeNames,
      !themeNames.length,
      `You don't have any saved themes yet`
    );
  }

  private showErrorMessageBasedOnCondition(
    valueToValidate: any,
    conditionOfError: boolean,
    errorMessage: string
  ): void {
    if (!valueToValidate) {
      this.valid = false;
    } else if (conditionOfError) {
      vscode.window.showInformationMessage(errorMessage);
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  private nameIsUnique(name: string, currentNames: string[]): boolean {
    return !currentNames.includes(name);
  }

  private stringIsAThemeCode(code: string): boolean {
    const colorStrings = code.split("/");
    const correctNumberOfColorStrings = colorStrings.length === 5;
    return correctNumberOfColorStrings && this.eachColorStringIsValid(colorStrings);
  }

  private eachColorStringIsValid(colorStrings: string[]) {
    return colorStrings.every(colorString => {
      const rgbValues = colorString.split("-");
      const lengthEquals3 = rgbValues.length === 3;
      const rgbValuesInRange = this.eachRGBValueIsInRange(rgbValues);
      return lengthEquals3 && rgbValuesInRange;
    });
  }

  private eachRGBValueIsInRange(rgbValues: string[]) {
    return rgbValues.every(rgbValue => {
      const n = Number.parseInt(rgbValue);
      return !Number.isNaN(n) && n < 256;
    });
  }
}
