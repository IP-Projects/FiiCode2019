import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: "root"
})
export class GenerateThumbnailAndEntityService {
  imageFormats = ["jpeg", "jpg", "png", "webp", "gif"];
  videoFormats = ["webm", "ogv", "mp4"];
  audioFormats = ["mp3", "wave", "ogg", "oga"];
  constructor() {}

  readUploadedFilesAndGetPlaceholders(e, collectionId) {
    const width = 240;
    const height = 240;
    var arrayOfEntityAndPlaceholder = [];
    e.target.file.forEach((file) => {
      const fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      (reader.onload = (event) => {
        var readerMetaData = event.target["result"].split(";")[0];
        if (readerMetaData.includes("image") && readerMetaData.includes("svg")) {
          arrayOfEntityAndPlaceholder.push(
            this.imageData(event.target["result"], width, height, "svg", fileName, 0, collectionId)
          );
        }
        if (readerMetaData.includes("image") && !readerMetaData.includes("svg")) {
          arrayOfEntityAndPlaceholder.push(
            this.imageData(event.target["result"], width, height, "image", fileName, 0, collectionId)
          );
        }
        if (readerMetaData.includes("audio")) {
          arrayOfEntityAndPlaceholder.push(
            this.imageData(event.target["result"], width, height, "audio", fileName, 0, collectionId)
          );
        }
        if (readerMetaData.includes("video")) {
          arrayOfEntityAndPlaceholder.push(
            this.imageData(event.target["result"], width, height, "video", fileName, 0, collectionId)
          );
        }
        if (readerMetaData.includes("pdf")) {
          arrayOfEntityAndPlaceholder.push(
            this.imageData(event.target["result"], width, height, "pdf", fileName, 0, collectionId)
          );
        }
      }),
        (reader.onerror = (error) => console.log(error));
    });
    return arrayOfEntityAndPlaceholder;
  }

  getPlaceholderFromUrl(url, fileName, collectionId) {
    const width = 240;
    const height = 240;
    var readerMetaData = url.split(".")[-1];
    if (readerMetaData.includes("svg")) {
      return this.imageData(url, width, height, "svg", fileName, 1, collectionId);
    }
    if (this.imageFormats.includes(readerMetaData)) {
      return this.imageData(url, width, height, "image", fileName, 1, collectionId);
    }
    if (this.audioFormats.includes(readerMetaData)) {
      return this.imageData(url, width, height, "audio", fileName, 1, collectionId);
    }
    if (this.videoFormats.includes(readerMetaData)) {
      return this.imageData(url, width, height, "video", fileName, 1, collectionId);
    }
    if (readerMetaData.includes("pdf")) {
      return this.imageData(url, width, height, "pdf", fileName, 1, collectionId);
    }
    if (url.includes("youtube")) {
      return this.youtubeData(url, width, height, "youtube", fileName, 1, collectionId);
    }
  }

  generatePostObject(data, canvas, extension, fileName, isUrl, collectionId) {
    return {
      Name: fileName,
      Data: canvas.toDataURL("image/jpeg", 1),
      CollectionId: collectionId,
      EntityFile: [
        {
          Name: fileName,
          Extension: extension,
          isUrl: isUrl,
          Data: data
        }
      ]
    };
  }

  imageData(data, width, height, extension, fileName, isUrl, collectionId) {
    const img = new Image();
    img.src = data;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);

      return this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId);
    };
  }

  audioData(data, width, height, extension, fileName, isUrl, collectionId) {
    const img = new Image();
    img.src = "../../../assets/newCollection.jpg";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      return this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId);
    };
  }
  pdfData(data, width, height, extension, fileName, isUrl, collectionId) {
    pdfjsLib.getDocument(data).then((pdf) => {
      pdf.getPage(1).then((page) => {
        var canvas = document.createElement("canvas");
        var viewport = page.getViewport(1.0);
        var context = canvas.getContext("2d");

        canvas.height = height;
        canvas.width = width;

        page
          .render({
            canvasContext: context,
            viewport: viewport
          })
          .then(() => {
            return this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId);
          });
      });
    });
  }

  videoData(data, width, height, extension, fileName, isUrl, collectionId) {
    const video = document.createElement("video");
    video.src = data;
    video.onloadeddata = (e) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height);
      return this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId);
    };
  }

  youtubeData(data, width, height, extension, fileName, isUrl, collectionId) {
    var url = "https://img.youtube.com/vi/" + data.split("/watch?v=")[1] + "/0.jpg";
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      return this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId);
    };
  }
}
