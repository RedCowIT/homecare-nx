import {dataURLToBlob} from "../support/canvas";

export interface ImageFileResizeOptions {
  file: File;

  onResize: (imageResult: { dataUrl: any, blob: any, filename: string }) => void;

  /** Default 960 */
  maxSize?: number;

  /** Default .6 */
  quality?: number;
}

export function imageFileResize(options: ImageFileResizeOptions) {

  const file = options.file;
  const onResize = options.onResize;
  const maxSize = options.maxSize ? options.maxSize : 960;
  const quality = options.quality ? options.quality : 0.6;

  // Ensure it's an image
  if (!file.type.match(/image.*/)) {
    throw new Error('Image resize failed: file is not of image type: ' + file.type);
  }

  // Load the image
  const reader = new FileReader();
  reader.onload = function (readerEvent) {
    const image = new Image();
    image.onload = function (imageEvent) {

      // Resize the image
      const canvas = document.createElement('canvas');

      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      canvas.getContext('2d').drawImage(image, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const resizedImage = dataURLToBlob(dataUrl);

      onResize({dataUrl, blob: resizedImage, filename: file.name})
    }

    image.src = readerEvent.target.result as any;
  }

  reader.readAsDataURL(file);

}
