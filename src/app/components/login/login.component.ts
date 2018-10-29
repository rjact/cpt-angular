import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [
	'../../../assets/styles/login.css'
  ]
})
export class LoginComponent {

	public username:string;
	public password: string;
	constructor(private dataService: DataService, private sessionService: SessionService, private router: Router){}

	doLogin() {
		this.sessionService.saveUser(this.username);
		this.router.navigate(['/']);
	}
}
