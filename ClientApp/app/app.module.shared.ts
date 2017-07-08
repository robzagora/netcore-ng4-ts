import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavComponent } from './core/nav/nav.component'

import {
    MdCoreModule,
    MdDialogModule, 
    MdChipsModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdAutocompleteModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        // BrowserAnimationsModule // causes app not to load when included
    ]
};