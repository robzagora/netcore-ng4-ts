import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';

// This is very important to do in order to allow slider/toggling animations to work with material 
import 'hammerjs';

import {
    MdCoreModule, 
    MdDialogModule, 
    MdChipsModule,
    MdCardModule, 
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MdProgressBarModule,
    MdIconModule,
    MdTableModule,
    MdMenuModule,
    MdSnackBarModule,
    MdSliderModule
} from '@angular/material';

//Should be last in load order
import { AppRoutingModule, routableComponents } from './modules/app-routing.module';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        routableComponents
    ],
    imports: [
        AppRoutingModule,
        MdCoreModule,
        MdDialogModule,
        MdChipsModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule,
        MdAutocompleteModule,
        MdProgressBarModule,
        MdIconModule,
        MdTableModule,
        MdMenuModule,
        MdSnackBarModule,
        MdSliderModule
    ]
};