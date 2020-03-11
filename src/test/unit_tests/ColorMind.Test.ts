import { expect, assert } from "chai";
import "mocha";
import * as TypeMoq from "typemoq";
import { XMLHttpRequest } from "xmlhttprequest-ts";
import ColorMind from "../../lib/ColorMind";

const colorPaletteResponse: any = {
  result: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15]
  ]
};

describe("ColorMind: getRandomColorPalette", () => {
  const mock: TypeMoq.IMock<XMLHttpRequest> = TypeMoq.Mock.ofType(XMLHttpRequest);

  mock.setup(x => x.readyState).returns(() => 4);
  mock.setup(x => x.status).returns(() => 200);
  mock.setup(x => x.responseText).returns(() => JSON.stringify(colorPaletteResponse));

  mock
    .setup(x => x.open(TypeMoq.It.isAnyString(), TypeMoq.It.isAnyString(), TypeMoq.It.isAny()))
    .returns(() => {});
  mock
    .setup(x => x.send(TypeMoq.It.isAnyString()))
    .returns(() => {
      if (mock.object.onreadystatechange) {
        mock.object.onreadystatechange();
      }
    });

  const colorMind = new ColorMind(mock.object);

  it("should return correct palette", async () => {
    try {
      const returnedPalette = await colorMind.getRandomColorPalette();
      expect(returnedPalette).to.deep.equals(colorPaletteResponse.result);
    } catch (error) {
      assert.fail(`getRandomColorPalette failed`);
    }
  });
});
