import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryComponent } from './components/entry/entry.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: EntryComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];
  
  @NgModule({
    imports: [ RouterModule.forRoot(routes, { enableTracing: false, useHash: false }) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}