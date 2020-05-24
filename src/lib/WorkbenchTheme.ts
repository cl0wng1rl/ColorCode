export default class WorkbenchTheme {
  private standardColors: { [index: string]: string } = {};
  private workbenchTheme: { [index: string]: string };

  constructor(standardColors: { [index: string]: string }) {
    this.standardColors = standardColors;
    this.workbenchTheme = {};
  }

  public getTheme(): Object {
    this.setForegroundColorFields();
    this.setBackgroundColorFields();
    this.setShadowAndFocusColorFields();
    return this.workbenchTheme;
  }

  private setForegroundColorFields(): void {
    this.setField("foreground", this.standardColors.foreground);
    this.setField("editor.foreground", this.standardColors.textForeground);
    this.setField("descriptionForeground", this.standardColors.descriptionForeground);
    this.setField("sideBar.foreground", this.standardColors.foreground);
  }

  private setBackgroundColorFields(): void {
    this.setInputBackgroundColorFields();
    this.setSideBarBackgroundColorFields();
    this.setEditorBackgroundColorFields();
    this.setOtherBackgroundColorFields();
  }

  private setInputBackgroundColorFields(): void {
    this.setField("input.background", this.standardColors.contrastBackground);
    this.setField("input.foreground", this.standardColors.textForeground);
    this.setField("quickInput.background", this.standardColors.contrastBackground);
    this.setField("quickInput.foreground", this.standardColors.textForeground);
  }

  private setSideBarBackgroundColorFields(): void {
    this.setField("sideBar.background", this.standardColors.background);
    this.setField("sideBar.border", this.standardColors.contrastBackground);
  }

  private setEditorBackgroundColorFields(): void {
    this.setField("editor.background", this.standardColors.background);
    this.setField("editorGroupHeader.tabsBackground", this.standardColors.trimBackground);
    this.setField("activityBar.background", this.standardColors.contrastBackground);
    this.setField("tab.activeBackground", this.standardColors.background);
    this.setField("tab.inactiveBackground", this.standardColors.contrastBackground);
  }

  private setOtherBackgroundColorFields(): void {
    this.setField("terminal.background", this.standardColors.contrastBackground);
    this.setField("selection.background", this.standardColors.foreground);
    this.setField("badge.background", this.standardColors.trimBackground);
    this.setField("panel.background", this.standardColors.trimBackground);
  }

  private setShadowAndFocusColorFields(): void {
    this.setField("widget.shadow", this.standardColors.borderBackground);
    this.setField("focusBorder", this.standardColors.borderBackground);
  }

  private setField(fieldName: string, fieldValue: string): void {
    this.workbenchTheme[fieldName] = fieldValue;
  }
}
