import Jimp from "jimp";

const AVATARS_WIDTH = 250;
const AVATARS_HEIGHT = 250;

export const isImageAndTransform = async (filePath) => {
  return new Promise((resolve) => {
    Jimp.read(filePath, async (err, image) => {
      if (err) resolve(false);
      try {
        const w = image.getWidth();
        const h = image.getHeight();

        const cropWidth = w > AVATARS_WIDTH ? AVATARS_WIDTH : w;
        const cropHeight = h > AVATARS_HEIGHT ? AVATARS_HEIGHT : h;

        const centerX = Math.round(w / 2 - cropWidth / 2);
        const centerY = Math.round(h / 2 - cropHeight / 2);

        await image
          .rotate(360)
          .crop(
            centerX < 0 ? 0 : centerX,
            centerY < 0 ? 0 : centerY,
            cropWidth,
            cropHeight
          )
          .write(filePath);
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
  });
};