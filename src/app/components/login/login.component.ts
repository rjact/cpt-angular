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

	private username:string;
	private password: string;
	constructor(private dataService: DataService, private sessionService: SessionService, private router: Router){}

	doLogin() {
		this.sessionService.saveUser(this.username);
		this.router.navigate(['/']);
	}
}
