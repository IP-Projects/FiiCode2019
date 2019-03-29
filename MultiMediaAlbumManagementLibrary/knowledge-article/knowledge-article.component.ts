import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Principal } from 'app/core/auth/principal.service';
import * as $ from 'jquery';
import 'jqueryui';
import * as JSZip from 'jszip';
// import { saveAs } from 'file-saver'

@Component({
  selector: 'app-knowledge-article',
  templateUrl: './knowledge-article.component.html',
  styleUrls: ['./knowledge-article.component.scss']
})
export class KnowledgeArticleComponent implements OnInit {
  KAblocksCounter = 0; //number of inserted custom blocks as new text areas or images, audio, video

  productGroupsList = ['TEM', 'SEM', 'SDB', 'EFA', 'XRS', 'APX', 'FPD', 'CMD']; //the list of product groups that will populate the multiselect
  productGroups = []; // data for multiselect, it is populated from the list above, it will contain items in the form of a json like {id:1, item:X}
  productGroupFilter = []; // data that has been selected from the multiselect

  //the list of taxonomy groups that will populate the multiselect
  taxonomyTypesList = ['Loader Group', 'Energy Filter Group', 'X-Ray', 'Hand Panels', 'Plasma Cleaner', 'Column Group', 'Omniprobe Group', 'High Tension Group',
    'Cabinet Group', 'Camera Group', 'Accelerator Group', 'CryoMAT', 'Motion Group', 'Detector Group', 'Autobakeout', 'System Computer', 'System', 'MultiChem', 'microHeater',
    'EFEM', 'G4 STEM', 'VolumeScope', 'Chamber', 'FDE', 'Enclosure', 'NSR', 'Charge Neutralizer', 'EFI', 'Accessories', 'VCE', 'Hoisting', 'Nanochemix', 'Tools', 'Facilities',
    'Automatic Cryo Box', 'ETEM', 'IR System', 'TSU', 'M-Console', 'Gun Blanker', 'Vacuum System', 'Software', 'JCP Front End', 'IVR', 'GIS', 'Cap Probe', 'Waterrack']; // taxonomy
  taxonomyTypes = [];// data for multiselect, it is populated from the list above, it will contain items in the form of a json like {id:1, item:X}
  taxonomyTypesFilter = [];// data that has been selected from the multiselect

  user; // the current user that is logged into the application
  doRemove: Boolean; // boolean value used for removing custom blocks
  fileName: String; // name of files in the zip file that will be send on submit
  date;


  constructor(
    private http: HttpClient,
    private principal: Principal) {
  }

  ngOnInit() {
    this.loadAvailableFilters();
    this.dragAndDropMediaFiles();
    this.metadataInsertion();
    // this.encodeUserAndPassword();
    this.doRemove = false; //the remove option is not selected at the beginning

  }

  //used to switch the colors of the remove button, so we have a visual indicator when we can remove an element
  removeElements() {
    this.doRemove = !this.doRemove; // switches true to false and false to true when we press the button so we can start or stop the removing 
    var btn = $('#KARemoveElementsButton');
    if (btn.hasClass('btn-primary')) {
      btn.switchClass('btn-primary', 'btn-danger');
    } else {
      btn.switchClass('btn-danger', 'btn-primary');
    }
  }

  // load the mulitselect values from the list
  loadAvailableFilters() {
    // loads the productGroups with values from productGroupsList
    let b = 0;
    for (const productGroup of this.productGroupsList) {
      this.productGroups.push({
        id: b++,
        itemName: productGroup
      });
    }/**/

    //loads the taxonomyTypes with values from taxonomyTypesList
    let c = 0;
    for (const type of this.taxonomyTypesList) {
      this.taxonomyTypes.push({
        id: c++,
        itemName: type
      });
    }

  }


  // inserts metadata in the Read-Only area of the form, it contains the user and the current date and the type of form
  metadataInsertion() {
    this.principal.identity().then((account) => {
      this.user = account;
      var metadata = $('#KAReadOnlyMetaData');
      var value = "[submitter]= " + this.user.FirstName + " " + this.user.LastName
        + ", " + "[date]= " + new Date().toISOString().toString().substring(0, 10) + ", "
        + "[time]= " + new Date().toISOString().toString().substring(11, 19)
        + ", [doc_type]= KA";
      metadata.val(value);
    });
  }


  // function that creates custom block, a resizable, dragable and removable text area
  createTextArea() {
    // if the "hint" ('Drag and drop files here') exists then it will remove it
    if ($('#KAToolTip').length != 0) {
      $('#KAToolTip').remove();
    }

    this.KAblocksCounter++;
    var textArea = $('<div style="display:inline-block;position:relative;width:250px; height:50px;min-height:25px;min-width:25px; padding:10px;z-index:10;"><textarea placeholder="Insert text" autofocus style="border:none;width:100%; height:100%;background: transparent;resize:none; overflow:hidden;"></textarea></div>').attr('id', 'KAblocks' + this.KAblocksCounter);
    $('#KAblocksContainer').append(textArea);
    var id = '#KAblocks' + this.KAblocksCounter;
    // add resizable properties
    $(id).resizable();
    // add dragable properties, it can be dragged only inside of #KAblocksContainer 
    $(id).draggable({ containment: "#KAblocksContainer" });
    //add removable properties
    $(id).on("click", () => {
      if (this.doRemove) {
        $(id).remove();
      }
    });

  }
  // function that creates custom block , a resizable, dragable and removable media file, be it audio, video or image
  dragAndDropMediaFiles() {
    // add listeners for drag events on #KAblocksContainer
    $('#KAblocksContainer').on(
      {
        'dragover dragenter': (e) => {
          e.preventDefault(); // like drag to reload on chrome for android
          e.stopPropagation();
        },
        //if a drop is detected we get the data transfered from it and read it, file by file
        'drop': (e, ui) => {
          var dataTransfer = e.originalEvent['dataTransfer'];
          if (dataTransfer && dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            $.each(dataTransfer.files, (i, file) => {
              // reads the data and then we convert it in a data string (in order to be saved in the html code)
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                // if the "hint" ('Drag and drop files here') exists then it will remove it
                if ($('#KAToolTip').length != 0) {
                  $('#KAToolTip').remove();
                }
                // the next blocks are the same in essence, if we match the type as image/video/audio we generate the block needed inside of a div
                // give it an id and then we append it to the main container #KAblocksContainer
                // then we use the same function to make it rezisable, draggable and removable as on textarea
                if (file.type.match('image.*')) {
                  this.KAblocksCounter++;
                  var img = $('<div style="display:inline-block;position:relative;width:150px; height:150px;min-height:25px;min-width:25px; padding:10px;"><img style="width:100%; height:100%;" src="' + reader.result + '" /></div>');
                  var id = 'KAblocks' + this.KAblocksCounter;
                  $(img).attr('id', id);
                  $('#KAblocksContainer').append(img);
                  id = '#' + id;
                  $(id).resizable();
                  $(id).draggable({ containment: "#KAblocksContainer" });
                  $(id).on("click", () => {
                    if (this.doRemove) {
                      $(id).remove();
                    }
                  });

                } else if (file.type.match('video.*')) {
                  this.KAblocksCounter++;
                  var video = $('<div style="display:inline-block;position:relative;width:150px; height:150px;min-height:25px;min-width:25px; padding:10px;"><video controls  style="width:100%; height:100%;"> <source src="' + reader.result + '" /></source></video></div>');
                  var id = 'KAblocks' + this.KAblocksCounter;
                  $(video).attr('id', id);
                  $('#KAblocksContainer').append(video);
                  id = '#' + id;
                  $(id).resizable();
                  $(id).draggable({ containment: "#KAblocksContainer" });
                  $(id).on("click", () => {
                    if (this.doRemove) {
                      $(id).remove();
                    }
                  });
                } else if (file.type.match('audio.*')) {
                  this.KAblocksCounter++;
                  var audio = $('<div style="display:inline-block;position:relative;width:150px; height:150px;max-height:50px;min-height:25px;min-width:25px; padding:10px;"><audio controls style="width:100%; height:100%;" src="' + reader.result + '" /></div>');
                  var id = 'KAblocks' + this.KAblocksCounter;
                  $(audio).attr('id', id);
                  $('#KAblocksContainer').append(audio);
                  id = '#' + id;
                  $(id).resizable();
                  $(id).draggable({ containment: "#KAblocksContainer" });
                  $(id).on("click", () => {
                    if (this.doRemove) {
                      $(id).remove();
                    }
                  });
                }
              };
            });
          }
        }
      });
  }

  generateOriginId() {
    // generate a unique non overlaping originId for the ftml file, it is made from 14 digits consisting of the current date 
    return ("" + this.date.getFullYear() + this.date.getMonth() + this.date.getDay() + this.date.getHours() + this.date.getMinutes() + this.date.getSeconds());
  }




  generateFTML() {
    // the header and the static metadata for the ftml file
    var ftml =
      `<?xml version="1.0" encoding="UTF-8"?>
      <ft:map ft:editorialType="article" ft:originID="${this.generateOriginId()}" ft:lang="en-US" xmlns:ft="http://ref.fluidtopics.com/v3/ft#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="ftmap.xsd">
        <ft:rights accessLevel="public"></ft:rights>
        <ft:metas>
          <ft:meta key="submitter" type="string">${this.user.FirstName + " " + this.user.LastName}</ft:meta>
          <ft:meta key="date" type="string">${new Date().toISOString().toString().substring(0, 10)}</ft:meta>
          <ft:meta key="time" type="string">${new Date().toISOString().toString().substring(11, 19)}</ft:meta>
          <ft:meta key="FEI_Doc_Type" type="string">Knowledge Article</ft:meta>
          <ft:meta key="validated" type="string">Unvalidated</ft:meta>\n`;

    //generate metadata from product groups selected
    this.productGroupFilter.forEach(element => {
      ftml = ftml + `          <ft:meta key="FEI_Product_Type" type="string">${element.itemName}</ft:meta>\n`;
    });

    //generate metadata from taxonomy groups selected
    this.taxonomyTypesFilter.forEach(element => {
      ftml = ftml + `          <ft:meta key="FEI_Taxonomy_Level2" type="string">${element.itemName}</ft:meta>\n`;
    });

    //footer of the file and the link to the html file from the zip (The html file is the inner html of the form)
    ftml = ftml + `
        </ft:metas>
        <ft:toc>
          <ft:node href="${this.fileName}.html" type="topic">
          </ft:node>
        </ft:toc>
      </ft:map>`;
    return ftml;
  }


  // encodeUserAndPassword() {
  //   var encodedText = new TextEncoder().encode("here i am with a pass and :::: login",'windows-1252');
  //   console.log(encodedText);
  // }




  //creates a source in Fluid Topics
  // createSource() {
  //   //one time use function
  //   var sourceBody = {
  //     "name": "Knowledge Article",
  //     "type": "Ftml",
  //     "description": "Source for Knowledge Article"
  //   };
  //   // create only one source FTMLKnowledgeArticles

  //   // console.log(JSON.stringify(sourceBody) + " \n url:" + "https://thermofisher-uat.fluidtopics.net/admin/khub/sources/FTML_KA");
  //   this.http.put("https://thermofisher-uat.fluidtopics.net/api/admin/khub/sources/FTML_KA", sourceBody, {
  //     headers: {
  //       "FT-Authorization": "Basic " + "U3VibWl0X0tBOktBX1Rlc3Rpbmc=",
  //       "Content-Type": "application/json"
  //     }
  //   }).subscribe(
  //     response => {
  //       console.log(response);
  //     }
  //   );

  // }

  //creates the header used to generate a source or to upload the files on it
  generateHeaders() {
    // the string after Basic + it is actual the credentials (username + password ) encoded to iso 8859-1 and then converted to base64 - this for the moment can not be done in javascript
    // this is the c# code used to get it  String encodedCreadentials = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes(username + ":" + password));
    // then you have to print it 
    let FtmlHeaders = new HttpHeaders({
      "Content-Type": "multipart/form-data",
      "FT-Authorization": "Basic " + "U3VibWl0X0tBOktBX1Rlc3Rpbmc=",
    });
    return { headers: FtmlHeaders };
  }

  submitKA() {
    this.date = new Date();
    this.fileName = this.user.FirstName + this.user.LastName + this.date.toISOString().toString().substring(0, 19).replace(/:/g, "-");

    //adds a red background to signal unvalidated article
    var cardHead = $('#KAHeader');
    var attr = cardHead.attr("style") + "color: #fff;background-color: #f86c6b!important;";
    cardHead.attr("style", attr);

    //gets the text from the virtual value of the text area to the dom value. That mean when you type data in a text area the DOM is not changing
    //but the text you typed is saved in a virtual attribute called Value, we get that value and place it between the <textarea> </textarea> tags
    var textareaArr = $('textarea');
    textareaArr.each(function () {
      var textarea = this;
      var value = textarea['value'];
      textarea['textContent'] = value;
      textarea.setAttribute("Readonly", "");
    });

    $('#KAMediaFilesController').remove(); // removes the buttons that add or delete media files or send verithing to FT
    //change multiselect to simple lists of items
    this.productGroupFilter.forEach(element => {
      console.log(element);
      $('#KAProductGroup').append(`<div style="display:inline-block;position:relative;padding:5px; margin:1px;border-radius:10px;color: #fff;background-color: #3598dc !important;">${element.itemName}</div>`)
    });
    this.taxonomyTypesFilter.forEach(element => {
      $('#KATaxonomy').append(`<div style="display:inline-block;position:relative;padding:5px; margin:1px;border-radius:10px;color: #fff;background-color: #3598dc !important;">${element.itemName}</div>`)
    });
    $("angular2-multiselect").remove();
    // converting bootstrap classes to inline-styling equivalent
    $("#KAFilters").attr("style", "overflow:hidden;-ms-flex: 1 1 auto;flex: 1 1 auto;padding: 1.25rem;");
    $("#KAProductGroup").attr("style", `-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 33.333333%;display: inline-block !important;float:left`);
    $("#KATaxonomy").attr("style", `-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 33.333333%;display: inline-block !important;float:right`);
    $("#KAProductGroup").removeClass();
    $("#KATaxonomy").removeClass();
    $("KAFilters").removeClass();


    // to send 
    var innerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Knowledge Article</title>
      <meta charset="utf-8">
    </head>
    <body>` + $("#KASenderInnerHtml").html() + `
    </body>
    </html>`;

    var zip = new JSZip();
    zip.file(`${this.fileName}.html`, innerHtml);
    zip.file(`${this.fileName}.ftmap`, this.generateFTML());
    zip.generateAsync({ type: "blob" }).then((content) => {
      // saveAs(content, "example.zip"); // used to download the zip file instead
      console.log(content)
      this.http.post("https://thermofisher-uat.fluidtopics.net/api/admin/khub/sources/FTML_KA/upload", content, this.generateHeaders()).subscribe(
        response => {
          // console.log(response);
        }
      );
    });
  }



}

