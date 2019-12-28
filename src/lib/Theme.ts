import * as Color from "color";
import ThemeSettings from "./ThemeSettings";

export default class Theme {
  static generateSettingsFromColorStrings(colourStrings: string[]): ThemeSettings {
    let colours = Theme.getColoursFromColourStrings(colourStrings);
    colours = Theme.orderColoursByLightness(colours);
    const jsonEditorTheme = {
      "[ColorCode]": Theme.createJSONEditorTheme(colours)
    };
    const jsonWorkbenchTheme = {
      "[ColorCode]": Theme.createJSONWorkbenchTheme(colours)
    };
    return new ThemeSettings(jsonWorkbenchTheme, jsonEditorTheme);
  }

  private static getColoursFromColourStrings(colourStrings: string[]): Color[] {
    let colours: Color[] = [];
    colourStrings.forEach(c => {
      colours.push(Color.rgb(c));
    });
    return colours;
  }

  private static orderColoursByLightness(colours: Color[]) {
    let orderedColours = colours;
    orderedColours.sort((a, b) => a.hsl().array()[2] - b.hsl().array()[2]);
    return orderedColours;
  }

  private static createJSONEditorTheme(colours: Color[]): Object {
    return {
      textMateRules: [
        {
          scope: ["keyword"],
          settings: {
            foreground: `${colours[4].hex()}`
          }
        },
        {
          scope: ["keyword.other.class"],
          settings: {
            foreground: `${colours[3].lighten(0.4).hex()}`
          }
        },
        {
          scope: ["storage.modifier"],
          settings: {
            foreground: `${colours[2].lighten(0.4).hex()}`
          }
        },
        {
          scope: ["constant.language"],
          settings: {
            foreground: `${colours[3].saturate(0.9).hex()}`
          }
        },
        {
          scope: ["constant.escape", "constant.numeric"],
          settings: {
            foreground: `${colours[2]
              .lighten(0.7)
              .saturate(0.7)
              .hex()}`
          }
        }
      ],
      comments: `${colours[0]
        .lighten(0.6)
        .saturate(0.5)
        .hex()}`,
      functions: `${colours[2]
        .lighten(0.4)
        .saturate(0.5)
        .hex()}`,
      keywords: `${colours[3]
        .lighten(0.2)
        .saturate(0.5)
        .hex()}`,
      numbers: `${colours[3]
        .lighten(0.2)
        .saturate(0.5)
        .hex()}`,
      strings: `${colours[1]
        .lighten(0.6)
        .saturate(0.5)
        .hex()}`,
      types: `${colours[1]
        .lighten(0.2)
        .saturate(0.5)
        .hex()}`,
      variables: `${colours[4]
        .darken(0.3)
        .saturate(0.5)
        .hex()}`
    };
  }

  private static createJSONWorkbenchTheme1(colours: Color[]): Object {
    return {
      focusBorder: `${colours[0].darken(0.5).hex()}`,
      foreground: `${colours[4].hex()}`,
      "widget.shadow": `${colours[0].darken(0.6).hex()}`,
      "selection.background": `${colours[0].darken(0.7).hex()}`,
      descriptionForeground: `${colours[3].darken(0.6).hex()}`,
      errorForeground: `${colours[3].hex()}`,
      "editor.background": `${colours[0].darken(0.7).hex()}`,
      "sideBar.background": `${colours[0].darken(0.6).hex()}`,
      "sideBar.foreground": `${colours[3].lighten(0.3).hex()}`,
      "menu.background": `${colours[0].darken(0.7).hex()}`,
      "menu.foreground": `${colours[2].hex()}`,
      "terminal.background": `${colours[0].darken(0.6).hex()}`,
      "badge.background": `${colours[0].darken(0.8).hex()}`,
      "input.background": `${colours[0].darken(0.7).hex()}`,
      "panel.background": `${colours[0].darken(0.6).hex()}`,
      "tab.activeBackground": `${colours[0].darken(0.8).hex()}`,
      "tab.inactiveBackground": `${colours[0].darken(0.6).hex()}`,
      "button.background": `${colours[0].darken(0.8).hex()}`,
      "activityBar.background": `${colours[0].darken(0.7).hex()}`
    };
  }

  private static createJSONWorkbenchTheme(colours: Color[]): Object {
    const editorBackgroundColor = `${colours[0].darken(0.7).hex()}`;
    const listBackgroundColor = `${colours[0].darken(0.5).hex()}`;
    const lineNumberForegroundColor = `${colours[0].darken(0.5).hex()}`;
    const contrastBorderColor = `${colours[0].darken(0.3).hex()}`;
    const focusBorderColor = `${colours[0].darken(0.5).hex()}`;
    const selectionBackgroundColor = `${colours[0].darken(0.6).hex()}`;
    const tabsBackgroundColor = `${colours[0].darken(0.5).hex()}`;
    const tabsForegroundColor = `${colours[1].lighten(0.5).hex()}`;
    const breadcrumbForegroundColor = `${colours[2].hex()}`;
    const errorForegroundColor = `${colours[0].darken(0.7).hex()}`;
    const foregroundColor = `${colours[4].hex()}`;
    const dropdownBorderColor = `${colours[0].darken(0.5).hex()}`;
    const widgetShadowColor = `${colours[0].darken(0.6).hex()}`;
    const titleBarColor = `${colours[3].darken(0.6).hex()}`;
    const buttonBackgroundColor = `${colours[0].darken(0.8).hex()}`;
    const buttonHoverBackgroundColor = `${colours[0].darken(0.8).hex()}`;
    const buttonForegroundColor = `${colours[0].darken(0.5).hex()}`;
    const scrollbarSliderColor = `${colours[1].darken(0.5).hex()}`;
    const warningBackgroundColor = `${colours[2].darken(0.8).hex()}`;
    const listColor = `${colours[4].darken(0.8).hex()}`;
    const tabActiveBackgroundColor = `${colours[0].darken(0.8).hex()}`;
    const tabsBorderColor = `${colours[1].darken(0.8).hex()}`;
    const _white = "#ffffff";
    return {
      contrastBorder: contrastBorderColor,
      focusBorder: focusBorderColor,
      foreground: foregroundColor,
      "widget.shadow": editorBackgroundColor,
      "selection.background": selectionBackgroundColor,
      errorForeground: editorBackgroundColor,
      "button.background": buttonBackgroundColor,
      "button.foreground": buttonForegroundColor,
      "button.hoverBackground": buttonHoverBackgroundColor,
      "dropdown.background": editorBackgroundColor,
      "dropdown.border": dropdownBorderColor,
      "dropdown.foreground": buttonForegroundColor,
      "input.background": listBackgroundColor,
      "input.border": dropdownBorderColor,
      "input.foreground": buttonForegroundColor,
      "input.placeholderForeground": dropdownBorderColor,
      "inputOption.activeBorder": buttonForegroundColor,
      "inputValidation.errorBackground": "#AB0300F2",
      "inputValidation.errorBorder": editorBackgroundColor,
      "inputValidation.infoBackground": editorBackgroundColor,
      "inputValidation.infoBorder": dropdownBorderColor,
      "inputValidation.warningBackground": "#675700F2",
      "inputValidation.warningBorder": "#FFCA28",
      "scrollbar.shadow": "#010b14",
      "scrollbarSlider.activeBackground": scrollbarSliderColor,
      "scrollbarSlider.background": scrollbarSliderColor,
      "scrollbarSlider.hoverBackground": scrollbarSliderColor,
      "badge.background": dropdownBorderColor,
      "badge.foreground": _white,
      "breadcrumb.foreground": breadcrumbForegroundColor,
      "breadcrumb.focusForeground": _white,
      "breadcrumb.activeSelectionForeground": _white,
      "breadcrumbPicker.background": "#001122",
      "list.activeSelectionBackground": listBackgroundColor,
      "list.activeSelectionForeground": _white,
      "list.invalidItemForeground": _white,
      "list.dropBackground": editorBackgroundColor,
      "list.focusBackground": "#010d18",
      "list.focusForeground": _white,
      "list.highlightForeground": _white,
      "list.hoverBackground": listBackgroundColor,
      "list.hoverForeground": _white,
      "list.inactiveSelectionBackground": listBackgroundColor,
      "list.inactiveSelectionForeground": _white,
      "activityBar.background": editorBackgroundColor,
      "activityBar.dropBackground": dropdownBorderColor,
      "activityBar.foreground": dropdownBorderColor,
      "activityBar.border": editorBackgroundColor,
      "activityBarBadge.background": "#44596b",
      "activityBarBadge.foreground": _white,
      "sideBar.background": editorBackgroundColor,
      "sideBar.foreground": _white,
      "sideBar.border": editorBackgroundColor,
      "sideBarTitle.foreground": tabsForegroundColor,
      "sideBarSectionHeader.background": editorBackgroundColor,
      "sideBarSectionHeader.foreground": tabsForegroundColor,
      "editorGroup.emptyBackground": editorBackgroundColor,
      "editorGroup.border": editorBackgroundColor,
      "editorGroup.dropBackground": "#7e57c273",
      "editorGroupHeader.noTabsBackground": editorBackgroundColor,
      "editorGroupHeader.tabsBackground": editorBackgroundColor,
      "editorGroupHeader.tabsBorder": tabsBorderColor,
      "tab.activeBackground": tabActiveBackgroundColor,
      "tab.activeForeground": _white,
      "tab.border": tabsBorderColor,
      "tab.activeBorder": tabsBorderColor,
      "tab.unfocusedActiveBorder": tabsBorderColor,
      "tab.inactiveBackground": tabsBackgroundColor,
      "tab.inactiveForeground": tabsForegroundColor,
      "tab.unfocusedActiveForeground": dropdownBorderColor,
      "tab.unfocusedInactiveForeground": dropdownBorderColor,
      "editor.background": editorBackgroundColor,
      "editor.foreground": foregroundColor,
      "editorLineNumber.foreground": lineNumberForegroundColor,
      "editorLineNumber.activeForeground": "#C5E4FD",
      "editorCursor.foreground": "#80a4c2",
      "editor.selectionBackground": "#1d3b53",
      "editor.selectionHighlightBackground": "#5f7e9779",
      "editor.inactiveSelectionBackground": "#7e57c25a",
      "editor.wordHighlightBackground": "#f6bbe533",
      "editor.wordHighlightStrongBackground": "#e2a2f433",
      "editor.findMatchBackground": "#5f7e9779",
      "editor.findMatchHighlightBackground": "#1085bb5d",
      "editor.hoverHighlightBackground": "#7e57c25a",
      "editor.lineHighlightBackground": "#0003",
      "editor.rangeHighlightBackground": "#7e57c25a",
      "editorIndentGuide.background": "#5e81ce52",
      "editorIndentGuide.activeBackground": "#7E97AC",
      "editorRuler.foreground": "#5e81ce52",
      "editorCodeLens.foreground": "#5e82ceb4",
      "editorBracketMatch.background": "#5f7e974d",
      "editorOverviewRuler.currentContentForeground": buttonHoverBackgroundColor,
      "editorOverviewRuler.incomingContentForeground": buttonHoverBackgroundColor,
      "editorOverviewRuler.commonContentForeground": buttonHoverBackgroundColor,
      "editorError.foreground": editorBackgroundColor,
      "editorWarning.foreground": "#b39554",
      "editorGutter.background": editorBackgroundColor,
      "editorGutter.modifiedBackground": "#e2b93d",
      "editorGutter.addedBackground": "#9CCC65",
      "editorGutter.deletedBackground": editorBackgroundColor,
      "diffEditor.insertedTextBackground": "#99b76d23",
      "diffEditor.insertedTextBorder": "#addb6733",
      "diffEditor.removedTextBackground": "#ef535033",
      "diffEditor.removedTextBorder": "#ef53504d",
      "editorWidget.background": "#021320",
      "editorWidget.border": dropdownBorderColor,
      "editorSuggestWidget.background": "#2C3043",
      "editorSuggestWidget.border": "#2B2F40",
      "editorSuggestWidget.foreground": foregroundColor,
      "editorSuggestWidget.highlightForeground": _white,
      "editorSuggestWidget.selectedBackground": dropdownBorderColor,
      "editorHoverWidget.background": editorBackgroundColor,
      "editorHoverWidget.border": dropdownBorderColor,
      "debugExceptionWidget.background": editorBackgroundColor,
      "debugExceptionWidget.border": dropdownBorderColor,
      "editorMarkerNavigation.background": "#0b2942",
      "editorMarkerNavigationError.background": editorBackgroundColor,
      "editorMarkerNavigationWarning.background": "#FFCA28",
      "peekView.border": dropdownBorderColor,
      "peekViewEditor.background": editorBackgroundColor,
      "peekViewEditor.matchHighlightBackground": "#7e57c25a",
      "peekViewResult.background": editorBackgroundColor,
      "peekViewResult.fileForeground": dropdownBorderColor,
      "peekViewResult.lineForeground": dropdownBorderColor,
      "peekViewResult.matchHighlightBackground": buttonForegroundColor,
      "peekViewResult.selectionBackground": "#2E3250",
      "peekViewResult.selectionForeground": dropdownBorderColor,
      "peekViewTitle.background": editorBackgroundColor,
      "peekViewTitleDescription.foreground": "#697098",
      "peekViewTitleLabel.foreground": dropdownBorderColor,
      "merge.currentHeaderBackground": dropdownBorderColor,
      "merge.incomingHeaderBackground": "#7e57c25a",
      "panel.background": editorBackgroundColor,
      "panel.border": dropdownBorderColor,
      "panelTitle.activeBorder": dropdownBorderColor,
      "panelTitle.activeForeground": buttonForegroundColor,
      "panelTitle.inactiveForeground": "#d6deeb80",
      "statusBar.background": editorBackgroundColor,
      "statusBar.foreground": dropdownBorderColor,
      "statusBar.border": tabsBorderColor,
      "statusBar.debuggingBackground": "#202431",
      "statusBar.debuggingBorder": "#1F2330",
      "statusBar.noFolderBackground": editorBackgroundColor,
      "statusBar.noFolderBorder": "#25293A",
      "statusBarItem.activeBackground": "#202431",
      "statusBarItem.hoverBackground": "#202431",
      "statusBarItem.prominentBackground": "#202431",
      "statusBarItem.prominentHoverBackground": "#202431",
      "titleBar.activeBackground": editorBackgroundColor,
      "titleBar.activeForeground": "#eeefff",
      "titleBar.inactiveBackground": "#010e1a",
      "notifications.background": "#01111d",
      "notifications.border": "#262a39",
      "notificationCenter.border": "#262a39",
      "notificationToast.border": "#262a39",
      "notifications.foreground": buttonForegroundColor,
      "notificationLink.foreground": "#80CBC4",
      "extensionButton.prominentForeground": buttonForegroundColor,
      "extensionButton.prominentBackground": buttonBackgroundColor,
      "extensionButton.prominentHoverBackground": buttonHoverBackgroundColor,
      "pickerGroup.foreground": "#d1aaff",
      "pickerGroup.border": editorBackgroundColor,
      "terminal.ansiWhite": _white,
      "terminal.ansiBlack": editorBackgroundColor,
      "terminal.ansiBlue": "#82AAFF",
      "terminal.ansiCyan": "#21c7a8",
      "terminal.ansiGreen": "#22da6e",
      "terminal.ansiMagenta": "#C792EA",
      "terminal.ansiRed": editorBackgroundColor,
      "terminal.ansiYellow": "#addb67",
      "terminal.ansiBrightWhite": _white,
      "terminal.ansiBrightBlack": "#575656",
      "terminal.ansiBrightBlue": "#82AAFF",
      "terminal.ansiBrightCyan": "#7fdbca",
      "terminal.ansiBrightGreen": "#22da6e",
      "terminal.ansiBrightMagenta": "#C792EA",
      "terminal.ansiBrightRed": editorBackgroundColor,
      "terminal.ansiBrightYellow": "#ffeb95",
      "terminal.selectionBackground": "#1b90dd4d",
      "terminalCursor.background": "#234d70",
      "debugToolBar.background": editorBackgroundColor,
      "welcomePage.buttonBackground": editorBackgroundColor,
      "welcomePage.buttonHoverBackground": editorBackgroundColor,
      "walkThrough.embeddedEditorBackground": editorBackgroundColor,
      "gitDecoration.modifiedResourceForeground": "#a2bffc",
      "gitDecoration.deletedResourceForeground": "#EF535090",
      "gitDecoration.untrackedResourceForeground": "#addb67ff",
      "gitDecoration.ignoredResourceForeground": "#395a75",
      "gitDecoration.conflictingResourceForeground": "#ffeb95cc",
      "source.elm": dropdownBorderColor,
      "string.quoted.single.js": _white,
      "meta.objectliteral.js": "#82AAFF"
    };
  }
}
