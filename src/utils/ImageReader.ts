import * as Tesseract from 'tesseract.js';

export class ImageReader{
    

    public async convertToText(imgScreenshot:string):Promise<string>{
        const { data: { text } } = await Tesseract.recognize(imgScreenshot);
        console.log('text',text);
        return text;
    }

      
}