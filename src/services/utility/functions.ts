import * as fs from 'fs';
export const invoiceImage = (req: any, res: any, next: any) => {
  if (req.files.imageName) {
    const image = req.files.imageName[0];
    const imagePath = `/invoice/${new Date()
      .getTime()
      .toString()}_${image.originalname.replace(
      /(?:\.(?![^.]+$)|[^\w.])+/g,
      '-'
    )}`;

    const fileContents = Buffer.from(image.buffer, 'base64');
    fs.writeFile(`uploaded-image/${imagePath}`, fileContents, (err) => {
      if (err) return console.error(err.message);
    });
    const newData = { ...req.body, imagePath, imageName: image.originalname };
    req.body = newData;
  }

  next();
};
