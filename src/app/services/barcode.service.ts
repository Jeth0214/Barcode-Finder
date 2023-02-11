import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { Photo } from '@capacitor/camera';

const IMAGE_DIR = 'stored-barcodes';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  image;
  constructor(private platform: Platform) { }

  // Return the image from the local filesystem
  loadImages() {
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data
    })
      .then((result) => {
      },
        async (error) => {
          console.log(error);
          await Filesystem.mkdir({
            path: IMAGE_DIR,
            directory: Directory.Data
          })
        }
      )

  }

  // load the image data
  async loadImageBase64Data(fileName) {
    let image
    const filePath = `${IMAGE_DIR}/${fileName}`;
    const readFile = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data
    });
    if (!readFile) {
      image = 'https://ionicframework.com/docs/img/demos/card-media.png'
    } else {

      image = `data:image/jpeg;base64,${readFile.data}`;
    }
    return image;
  }

  // Create a new file from a capture image
  async saveBarcodeImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });
    await this.loadImages();
    return fileName;
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
