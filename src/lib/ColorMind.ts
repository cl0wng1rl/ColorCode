import { XMLHttpRequest } from "xmlhttprequest-ts";

export default class ColorMind {
  static async getRandomColourPalette() {
    return new Promise<string[]>((resolve, reject) => {
      var url = "http://colormind.io/api/";
      var data = {
        model: "default"
      };

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          return resolve(JSON.parse(xhr.responseText).result);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
          return reject("ERROR");
        }
      };

      xhr.open("POST", url, true);
      xhr.send(JSON.stringify(data));
    });
  }
}
