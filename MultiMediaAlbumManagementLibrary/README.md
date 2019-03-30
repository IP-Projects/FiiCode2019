# Summary

Multimedia Management is an application meant to facilitate the collection and distribution of various multimedia files. Right now it supports all the major types of image, audio and video used in browsers as well as a few extra modules that can be installed, namely youtube package, a pdf package and a svg package.

It was developed with the idea of customizability in mind.
By default it offers 2 stand-alone screens. A screen that shows all the collections of a user from which we can navigate and view each individual collection and it's files, and a screen that displays a specific collection with it's files. If the application doesn't use users, then it will default to a basic user

The major features of this applications are:

- full customizability, either by a json config file or by inputs
- add, delete and filter functions for both files and collections
- voice commands. the full list can be seen bellow
- easteregg
- touch gestures
- responsive design
- automated thumbnail creation for the various media files imported by either url or file
- infinite scrolling

# Installation

The installation process can vary depending on your personal use-case.

## 1.Clone the Source Code

If you want to develop on top of the current project, then you only have to clone the repository, access "Frontend-example" and use the project "MultiMediaAlbumManagement - example based on the source code"
Open a terminal inside the project run `npm install` and you are good to go.

## 2.Use the distribution

This application has 2 distributions. They can be found inside the "MultiMediaAlbumManagementLibrary/DistributionPackage" folder.
These distributions are as follows:

- A library for angular applications found in the "Ngx" folder
- A custom element found in the "Core"

The third folder "Extras" hosts the extra module for youtube,pdf and svg.
At the moment of writing 29.03.2019 Angular doesn't support dynamic imports making the "Extras" in fact required in the application. Right now the only purpose for it is future proofing.

Both distributions can be installed either through npm or just by cloning them.
The rest of the folders inside the "MultiMediaAlbumManagementLibrary" contains the source code for these distributions.

## Using the custom element distribution

A custom element, or a custom web element is simply a custom tag that will be rendered inside the browser using custom rules and functionality
To use this distribution depending on your environment it can be as simple as importing the index.js and the style.css in your app to more complex set of steps

```
<head>
  <link rel="stylesheet" href="styles.css" />
  <script src="index.js"></script>
</head>
<body>
  <collection-of-multimedia-albums>
  </collection-of-multimedia-albums>
</body>
```

For each screen there are different tags:

- Collections page

```
  <collection-of-multimedia-albums></collection-of-multimedia-albums>

```

- Albums page

```
  <multimedia-album-standalone></multimedia-album-standalone>
```

Although I do not recommend using it inside angular, due to duplicate libraries, I will explain the importing method in it.

Open your app.module.ts file, add in these lines:

```
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // add this line
@NgModule({
declarations: [],
schemas: [CUSTOM_ELEMENTS_SCHEMA], // add this line
})
export class AppModule { }
```

## Using the ngx distribution

It can be used only inside Angular applications. All you need to do to use it, is to import the main module in your app.module.ts (or the module you desire)

```
@NgModule({
imports: [...,NgxMultiMediaAlbumManagementModule...]
})
```

Copy the content of the assets folder in your own assets folder and import in your styles.scss helper-styles.scss or if you use plain css then import in your styles.css the styles.css file from the folder's module.

In angular.json make sure you have following lines:

```
"styles": ["src/styles.scss", "node_modules/bootstrap/scss/bootstrap.scss"],
"scripts": [

    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"

],
```

Then you can use the following 2 components :

- Collections page

```
  <app-collection-of-multimedia-albums></app-collection-of-multimedia-albums>

```

- Albums page

```
  <app-stand-alone></app-stand-alone>
```

# Costumizations

## 1. Design Level

To be able to customize the style of the application there are empty id's for every major component.
In order to customize that section just use the #sectionId selector or more specific selectors with the styles you desire. ex: \$id > div > img

List of empty Ids:

- Collections page: collection-of-multimedia-albums,button-area,addCollectionButton,deleteCollectionButton,suggestionsCollectionButton, collections-area,placeholder2d,placeholder3d,collection-name, addCollectionModal,addCollection, seeSuggestionsModal,seeSuggestions,deleteConfirmationModal,deleteConfirmation,floatingMicrophone

- Albums page: multimedia-album,button-area,addEntityButton,deleteEntityButton,suggestionsEntityButton,album-area,placeholder2d,entity-name,addCollectionModal,addCollection, seeSuggestionsModal,seeSuggestions,deleteConfirmationModal,deleteConfirmation,floatingMicrophone

- LightBox has dynamic Ids. The used ones are entityModal, suggestedEntityModal

## 2. Functionality Level

The 2 screens presented above can take multiple parameters to change it's behavior.
These parameters can be given on input or using a Json configuration file
Example of parameter send on input:

```
<collection-of-multimedia-albums gridSize="10">
</collection-of-multimedia-albums>
```

Most of the parameters can be omitted on input as long as the "configPath" parameter is given with a valid path
The importance of the parameters is defined by the rule of specificity. The most important parameters are the one on the input since they are specifically put, then the ones from the Json file since they come in batch, and if no parameter is given on either way the default will be used.

The following Json config file will contain all the parameters that can be used on the Collection screen. The same can be used on Albums screen too, since the difference is only a few parameters missing, namely the ones that are about the collection or user.

```
{
"gridSize": 7,
"bootstrapAccentPrimary": "danger",
"bootstrapAccentSecondary": "dark",
"userId": "a5c924d1-9af1-4f6b-a35c-51d951dddf32",
"take": 10,
"skip": 0,
"collectionUrl": "http://localhost:49773/api/Users/$userId/$take/$skip",
"suggestedCollectionUrl": "http://localhost:49773/api/Users/public/$userId/$take/$skip",
"deleteCollectionUrl": "http://localhost:49773/api/Collections/$collectionId",
"addCollectionUrl": "http://localhost:49773/api/Collections",
"albumUrl": "http://localhost:49773/api/Collections/$collectionId/$take/$skip",
"suggestedEntityUrl": "http://localhost:49773/api/Collections/$collectionId/$take/$skip",
"deleteEntityUrl": "http://localhost:49773/api/Placeholders/$entityId",
"addEntitiesUrl": "http://localhost:49773/api/Placeholders",
"getEntityUrl": "http://localhost:49773/api/Placeholders/$entityId",
"slideShow": false,
"lockSlideShow": false,
"slideShowTimeBeforeNext": 5000
}
```

This config file is tested with the backend from the folder "Backend-example"

### Parameters Explanation

```
"gridSize" - controlls the number of files / collections to be displayed on the page
"bootstrapAccentPrimary" - the main bootstrap color for the buttons
"bootstrapAccentSecondary" - the secondary bootstrap color for the buttons
"userId" - the user for which you want to display it's collections
"take" - the number of files / collections to retrieve at a time
"skip"- the number of files / collections to skip  at a time

Any api url should follow the next pattern
url/$....//$take/$skip
Following this rule ensure that every parameter is replaced with the corresponding item
In the same time it means that skipping some of the parameters can make us a backend-less application
To put it in perspective, if we have a file named collection.json and we set no parameters and just give the path to this file, then we will retrieve the data from it
It will be harder to apply the same logic for the albums since they will have to be named using the collection the come from

"collectionUrl" - link / path from where to retrieves all the collections of the user
"suggestedCollectionUrl" - link / path from where to retrieves all the suggested collections of the user
"deleteCollectionUrl" - link / path where to send the request to delete a collection
"addCollectionUrl"- link where to send the request to add a collection
"albumUrl" -  link / path from where to retrieves all the placeholders and files for the collection
"suggestedEntityUrl"-  link / path from where to retrieves all the suggested placeholders and files for the collection
"deleteEntityUrl"- link / path where to send the request to delete a placeholder and it's entity
"addEntitiesUrl"- link / path where to send the request to add a placeholder and it's entity
"getEntityUrl"- link / path where to send the request to get the placeholder and it's entity
"slideShow" - turns on or off the slide show while on the album page and with the LightBox visible
"lockSlideShow" - locks the user inside the LightBox
"slideShowTimeBeforeNext" - Delay between changing slides / files
```

# EasterEgg

You can play snake in the console

```
space/enter - stops/resets the game
arrows - movement
```

# Voice

The application supports various commands to open the different menus.
To turn on the microphone use the icon in the right bottom corner.
The microphone will turn off automatically if no sound is detected or if a command was recieved
The microphone icon can be moved around the screen

## Voice Commands

- delete - presses the delete button
- add - opens the add modal
- tip/suggestion/recommendations - opens the suggested modal
- snake - initializes the snake game

# Infinite scrolling / loading

This feature is controlled changing the "take" and "skip" parameters. If you want to load the entire database at once then you can set the "take" at a very large number, otherwise set it to fit your needs, default value is set to 10.
The loading logic is the following:

- If there is enough room left on the screen before you have to scroll, then the application will send a new request for new data. This will happen as long as the scroll bar didn't appear or as long as there is still data
- If you are viewing a file and click next / swipe left then a request for new data will be send, if there are no more data, then the first file will be displayed

This feature is applied for both Collections page and Albums page

# Limitations

Maximum size for a file is 20MB

# Known issues

Aot and BuildOptimizer are disabled since there is a bug in Angular's route package when used in combination with angular libraries
https://github.com/angular/angular-cli/issues/11394

Dynamic module imports for angular are only in the stage of feature request right now, hence the reason why the "extras" packages are a dependency
