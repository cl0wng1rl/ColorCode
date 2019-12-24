import { XMLHttpRequest } from "xmlhttprequest-ts";

exports.getRandomColourPalette = function() {
  return new Promise((resolve, reject) => {
    var url = "http://colormind.io/api/";
    var data = {
      model: "default"
    };

    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        return resolve(JSON.parse(http.responseText).result);
      } else if (http.readyState === 4 && http.status !== 200) {
        return reject("ERROR");
      }
    };

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
  });
};
