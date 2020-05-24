import { XMLHttpRequest } from "xmlhttprequest-ts";

export default class ColorMind {
  private xhr: XMLHttpRequest;

  constructor(xhr?: XMLHttpRequest) {
    if (xhr) {
      this.xhr = xhr;
    } else {
      this.xhr = new XMLHttpRequest();
    }
  }

  async getRandomColorPalette() {
    return new Promise<number[][]>((resolve, reject) => {
      var url = "http://colormind.io/api/";
      var data = {
        model: "default",
      };

      this.xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const responseObject = JSON.parse(this.responseText);
          resolve(responseObject.result);
        } else if (this.readyState === 4 && this.status !== 200) {
          reject(`readyState: ${this.readyState}, status: ${this.status}`);
        }
      };

      this.xhr.open("POST", url, true);
      this.xhr.send(JSON.stringify(data));
    });
  }
}
