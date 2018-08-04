import { Injectable } from '@angular/core';


@Injectable()
export class SessionService {
    
	constructor() {}
	
	saveUser(username) {
		window.sessionStorage.setItem('user', username)
	}
    
}
