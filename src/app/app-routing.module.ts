import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryComponent } from './components/entry/entry.component';

const routes: Routes = [
	{ path: '', component: EntryComponent, pathMatch: 'full' }
];
  
  @NgModule({
    imports: [ RouterModule.forRoot(routes, { enableTracing: false, useHash: false }) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}