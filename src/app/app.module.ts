import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EntryComponent } from './components/entry/entry.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
	EntryComponent
  ],
  imports: [
	  BrowserModule, 
	  BrowserAnimationsModule, 
	  DropDownsModule,
	  AppRoutingModule,
	  FormsModule,
	  HttpModule
	],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
