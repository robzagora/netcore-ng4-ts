import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header.component'

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

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        // angular modules need to be after browser module
        //MdCoreModule,
       // MdDialogModule,
        MdChipsModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule,
        MdAutocompleteModule,
        // BrowserAnimationsModule
    ]
};