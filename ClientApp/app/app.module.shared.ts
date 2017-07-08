import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './core/nav/nav.component';

import { NavService } from './core/nav/nav.service';

import {
    MdCoreModule, 
    MdDialogModule, 
    MdChipsModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdProgressBarModule
} from '@angular/material';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Should be last in load order
import { AppRoutingModule, routableComponents } from './core/app-routing.module';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        routableComponents
    ],
    imports: [
        AppRoutingModule,
        // angular modules need to be after browser module
        MdCoreModule,
        MdDialogModule,
        MdChipsModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule,
        MdAutocompleteModule,
        MdProgressBarModule
        //BrowserAnimationsModule // causes app not to load when included
    ],
    providers: [NavService]
};