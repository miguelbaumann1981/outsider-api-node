import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export class ImageController {
  constructor() {}

  getImage = (req: Request, res: Response) => {
    const { img = '' } = req.params;
    const imagePath = path.resolve(__dirname, `../../../../uploads/${img}`);

    if (!fs.existsSync(imagePath)) {
      return res.status(400).send('IMAGE_NOT_FOUND');
    }

    res.sendFile(imagePath);
  };
}
