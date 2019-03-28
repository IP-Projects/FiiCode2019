To be updated

run npm install @multimedia-album-management in order to use the album components in your application, then import it as a custom element, in angular for example you have to:
Open your app.module.ts file, add in these lines:

```
//...
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // add this line
// ...
@NgModule({
declarations: [
// ...
]
schemas: [CUSTOM_ELEMENTS_SCHEMA], // add this line
})
export class AppModule { }
```

for addition modules you will have to install the extras with npm install @multimedia-album-management-extras

if you use it in plain html with js
you will have to clone the distribution folder
and import the library
to use the input fields , you will have to initialize the component in the html page then
eg
<app-root title = "something"></app-root>

to be able to customize the style of the application
we let some empty id's for every major component
in order to customize that section just use the #sectionId selector or more specific selectors with the styles you desire

list of empty ids:
button-area, collections-area,placeholder2d,placeholder3d,collection-name

api url must fallow the next pattern

"url/$userId/$take/ \$skip"
that means if you want to load data from a local json you just have to omit the variables
<app-collection-of-multimedia-albums
gridSize="7"
configPath="../../../assets/config.json"

> </app-collection-of-multimedia-albums>
