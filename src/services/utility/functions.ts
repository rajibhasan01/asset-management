import * as fs from 'fs';
export const invoiceImage = (req: any, res: any, next: any) => {
  let imagePath = req.body.imagePath;
  const imageName = req.body.imgName;

  delete req.body.imagePath;
  delete req.body.imagePath;

  if (req.files.imageName) {
    const image = req.files.imageName[0];
    imagePath = `/invoice/${new Date()
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
  else{
    const newData = {...req.body, imagePath, imageName};
    req.body = newData
  }

  next();
};

export const uid = () =>{
  return Number(Math.random().toString() + Date.now().toString().substr(2)).toFixed(10).split('.')[1];
}
