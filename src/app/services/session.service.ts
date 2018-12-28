import { Injectable } from '@angular/core';
import { User } from '../models/User';


@Injectable()
export class SessionService {
    
	constructor() {}
	
	saveUser(user) {
		window.sessionStorage.setItem('user', JSON.stringify(user));
	}

	getUser(): User {
		return (JSON.parse(window.sessionStorage.getItem("user")) as User) || new User();
	}

	showError(message:string) {
		alert(message);
	}

	showInfo(message:string) {
		alert(message);
	}
    
}
