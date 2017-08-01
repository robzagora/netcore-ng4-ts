import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    MdSliderModule,
    MdTooltipModule,
    MdProgressSpinnerModule
} from '@angular/material';

// This is very important to do in order to allow slider/toggling animations to work with material 
import 'hammerjs';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginDialogComponent } from './components/login/login-dialog.component';

import { NavService } from './services/nav.service';
import { NewsService } from './services/news.service';
import { ProgressService } from './services/progress.service'
import { SnackbarService } from './services/snackbar.service';
import { VisualisationService } from './services/visualisation.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './library/auth/auth-guard';
import { LoggedInGuard } from './library/auth/logged-in-guard';

//Should be last in load order
import { AppRoutingModule, routableComponents } from './modules/app-routing.module';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        LoginDialogComponent,
        routableComponents
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        NavService,
        NewsService,
        ProgressService,
        SnackbarService,
        VisualisationService,
        AuthService,
        AuthGuard,
        LoggedInGuard
    ],
    entryComponents: [LoginDialogComponent],
    imports: [
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
        MdSliderModule,
        MdTooltipModule,
        MdProgressSpinnerModule,
        AppRoutingModule
    ]
};