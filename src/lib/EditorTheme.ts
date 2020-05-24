export default class EditorTheme {
  private standardColors: { [index: string]: string } = {};
  private editorTheme: Object;

  constructor(standardColors: { [index: string]: string }) {
    this.standardColors = standardColors;
    this.editorTheme = {};
  }

  public getTheme(): Object {
    return {
      textMateRules: this.getAllTextMateRules(),
      comments: this.standardColors.comments,
      functions: this.standardColors.functions,
      keywords: this.standardColors.keywords,
      numbers: this.standardColors.numbers,
      strings: this.standardColors.strings,
      types: this.standardColors.types,
      variables: this.standardColors.variables,
    };
  }

  private getAllTextMateRules(): Object[] {
    return [
      this.getTextMateRule(["keyword"], this.standardColors.keywords),
      this.getTextMateRule(["keyword.operator.arithmetic.js"], this.standardColors.operators),
      this.getTextMateRule(["keyword.operator.new"], this.standardColors.newKeyword, "bold"),
      this.getPropertyTextMateRule(),
      this.getTextMateRule(["storage.type.class"], this.standardColors.classKeyword, "bold"),
      this.getClassTextMateRule(),
      this.getTextMateRule(["storage.modifier"], this.standardColors.modifiers),
      this.getTextMateRule(["constant.language"], this.standardColors.booleans, "italic"),
      this.getTextMateRule(["support.type.property-name.json"], this.standardColors.keywords),
      this.getTextMateRule(["support.constant.json"], this.standardColors.variables),
      this.getDictionaryAndConstantTextMateRule(),
    ];
  }

  private getPropertyTextMateRule(): Object {
    return this.getTextMateRule(
      [
        "variable.other.property",
        "storage.type.property.js",
        "storage.type.property.ts",
        "storage.type.property.tsx",
      ],
      this.standardColors.properties,
      "italic"
    );
  }

  private getClassTextMateRule(): Object {
    return this.getTextMateRule(
      ["keyword.other.class, entity.name.type.class"],
      this.standardColors.classNames
    );
  }

  private getDictionaryAndConstantTextMateRule(): Object {
    return this.getTextMateRule(
      ["meta.structure.dictionary.json meta.structure.dictionary.value constant.language"],
      this.standardColors.classKeyword
    );
  }

  private getTextMateRule(scope: string[], foreground: string, fontStyle?: string): Object {
    return {
      scope: scope,
      settings: { foreground: foreground, fontStyle: fontStyle },
    };
  }
}
