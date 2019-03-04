To be updated

run npm install @multimedia-album-management in order to use the album components in your application, then import it as a custom element, in angular for example you have to:
    Open your app.module.ts file, add in these lines:
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
for addition modules you will have to install the extras with npm install @multimedia-album-management-extras