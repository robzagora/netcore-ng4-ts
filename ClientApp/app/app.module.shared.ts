import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';

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
    MdSnackBarModule
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
        MdSnackBarModule
    ]
};