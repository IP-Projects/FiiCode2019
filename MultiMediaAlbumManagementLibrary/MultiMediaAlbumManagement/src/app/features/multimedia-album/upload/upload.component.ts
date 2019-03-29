import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
import * as pdfjsLib from 'pdfjs-dist';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit, OnChanges {
  @Input()
  upload;

  @Input()
  collectionId;

  @Input()
  addEntitiesUrl;

  @Output()
  newData = new EventEmitter();

  imageFormats = ["jpeg", "jpg", "png", "webp", "gif"];
  videoFormats = ["webm", "ogv", "mp4"];
  audioFormats = ["mp3", "wave", "ogg", "oga"];
  arrayOfEntityAndPlaceholder = [];
  constructor(public api: ApiService) {}

  ngOnInit() {
    this.makeUploadArea();
    // setInterval(() => {
    //   console.log(this.arrayOfEntityAndPlaceholder);
    // }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.upload == true) {
      this.uploadFiles();
    }
  }

  uploadFiles() {
    console.log(this.addEntitiesUrl);
    console.log(this.arrayOfEntityAndPlaceholder);

    this.api
      .postData(this.addEntitiesUrl, this.arrayOfEntityAndPlaceholder)
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
        console.log(this.arrayOfEntityAndPlaceholder);

        for (var i = 0; i < this.arrayOfEntityAndPlaceholder.length; i++) {
          this.arrayOfEntityAndPlaceholder[i]["entityFile"] = null;
          this.arrayOfEntityAndPlaceholder[i]["id"] = data[i]["id"];
        }
        this.newData.emit(this.arrayOfEntityAndPlaceholder);
        this.arrayOfEntityAndPlaceholder = [];
        console.log(this.arrayOfEntityAndPlaceholder);
      });
  }

  makeUploadArea() {
    $("#uploadModal").on({
      "dragover dragenter": (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      drop: (e, ui) => {
        var dataTransfer = e.originalEvent["dataTransfer"];
        console.log(dataTransfer);
        if (dataTransfer && dataTransfer.files.length) {
          console.log(dataTransfer);
          e.preventDefault();
          e.stopPropagation();
          console.log(
            this.readUploadedFilesAndGetPlaceholders(dataTransfer.files, this.collectionId)
          );
        }
      }
    });
  }

  readUploadedFilesAndGetPlaceholders(e, collectionId) {
    const width = 250;
    const height = 150;
    console.log(e);
    Object.keys(e).forEach((file) => {
      console.log(e[file]);
      const fileName = e[file].name;
      const reader = new FileReader();
      reader.readAsDataURL(e[file]);
      (reader.onload = (event) => {
        var readerMetaData = event.target["result"].split(";")[0];
        if (readerMetaData.includes("image") && readerMetaData.includes("svg")) {
          this.imageData(event.target["result"], width, height, "svg", fileName, 0, collectionId);
        }
        if (readerMetaData.includes("image") && !readerMetaData.includes("svg")) {
          this.imageData(event.target["result"], width, height, "image", fileName, 0, collectionId);
        }
        if (readerMetaData.includes("audio")) {
          this.audioData(event.target["result"], width, height, "audio", fileName, 0, collectionId);
        }
        if (readerMetaData.includes("video")) {
          this.videoData(event.target["result"], width, height, "video", fileName, 0, collectionId);
        }
        if (readerMetaData.includes("pdf")) {
          this.pdfData(event.target["result"], width, height, "pdf", fileName, 0, collectionId);
        }
      }),
        (reader.onerror = (error) => console.log(error));
    });
  }

  getPlaceholderFromUrl(url, fileName, collectionId) {
    const width = 250;
    const height = 150;
    var readerMetaData = url.split(".")[-1];
    if (readerMetaData.includes("svg")) {
      this.imageData(url, width, height, "svg", fileName, 1, collectionId);
    }
    if (this.imageFormats.includes(readerMetaData)) {
      this.imageData(url, width, height, "image", fileName, 1, collectionId);
    }
    if (this.audioFormats.includes(readerMetaData)) {
      this.audioData(url, width, height, "audio", fileName, 1, collectionId);
    }
    if (this.videoFormats.includes(readerMetaData)) {
      this.videoData(url, width, height, "video", fileName, 1, collectionId);
    }
    if (readerMetaData.includes("pdf")) {
      this.pdfData(url, width, height, "pdf", fileName, 1, collectionId);
    }
    if (url.includes("youtube")) {
      this.youtubeData(url, width, height, "youtube", fileName, 1, collectionId);
    }
  }

  generatePostObject(data, canvas, extension, fileName, isUrl, collectionId) {
    return {
      name: fileName,
      data: canvas.toDataURL("image/jpeg", 1),
      collectionId: collectionId,
      entityFile: [
        {
          name: fileName,
          extension: extension,
          isUrl: isUrl,
          data: data
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

      this.arrayOfEntityAndPlaceholder.push(
        this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId)
      );
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
      this.arrayOfEntityAndPlaceholder.push(
        this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId)
      );
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
            this.arrayOfEntityAndPlaceholder.push(
              this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId)
            );
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
      this.arrayOfEntityAndPlaceholder.push(
        this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId)
      );
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
      this.arrayOfEntityAndPlaceholder.push(
        this.generatePostObject(data, canvas, extension, fileName, isUrl, collectionId)
      );
    };
  }
}
