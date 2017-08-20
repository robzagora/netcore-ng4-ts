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

import 'signalr';

import { SignalRModule, SignalRConfiguration, ConnectionTransports } from 'ng2-signalr';

// This is very important to do in order to allow slider/toggling animations to work with material 
import 'hammerjs';

import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginDialogComponent } from './components/login/login-dialog.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessageComponent } from './components/chat/chat-message.component';

import { NavService } from './services/nav.service';
import { NewsService } from './services/news.service';
import { ProgressService } from './services/progress.service'
import { SnackbarService } from './services/snackbar.service';
import { VisualisationService } from './services/visualisation.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './library/auth/auth-guard';
import { LoggedInGuard } from './library/auth/logged-in-guard';

import { SignalrConnectionResolver } from './library/chat/signalr-connection-resolver';

//Should be last in load order
import { AppRoutingModule, routableComponents } from './modules/app-routing.module';

export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.hubName = 'Chat';
    c.qs = { user: 'rob' };
    //c.url = 'http://ng2-signalr-backend.azurewebsites.net/';
    c.logging = true;
    c.transport = [ConnectionTransports.webSockets, ConnectionTransports.longPolling];

    return c;
}

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavComponent,
        LoginDialogComponent,
        ChatComponent,
        ChatMessageComponent,
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
        LoggedInGuard,
        SignalrConnectionResolver
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
        AppRoutingModule,
        SignalRModule.forRoot(createConfig)
    ]
};