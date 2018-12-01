import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EntryComponent } from './components/entry/entry.component';
import { Icd10Component } from './components/icd10/icd10.component';
import { DataService } from './services/data.service';
import { SessionService } from './services/session.service';
import { AuthGuard } from './auth.guard';
import { SequencesComponent } from './components/sequences/sequences.component';
import { LoginComponent } from './components/login/login.component';
import { SearchService } from './services/search.service';
import { HighlightTermPipe } from './pipes/highlight-term.pipe';
import { KeepHtmlPipe } from './pipes/keep-html.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NewProcedureComponent } from './components/entry/modals/new-procedure.component';

@NgModule({
  declarations: [
	  LoginComponent,
    AppComponent,
	EntryComponent,
	Icd10Component,
	SequencesComponent,
	HighlightTermPipe,
	KeepHtmlPipe,
	NewProcedureComponent,
  ],
  imports: [
		BrowserModule, 
		BrowserAnimationsModule, 
		AppRoutingModule,
		FormsModule,
		HttpModule,


		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
  providers: [DataService, AuthGuard, SessionService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
