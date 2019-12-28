export default class ThemeSettings {
  colorCustomizations: Object = {};
  tokenColorCustomizations: Object = {};

  constructor(colorCustomizations: Object, tokenColorCustomizations: Object) {
    this.colorCustomizations = colorCustomizations;
    this.tokenColorCustomizations = tokenColorCustomizations;
  }
}
