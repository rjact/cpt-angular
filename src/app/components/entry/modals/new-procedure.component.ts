import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Procedure } from '../../../models/Procedure';
import { User } from 'src/app/models/User';
import { SessionService } from '../../../services/session.service';

@Component({
	selector: 'new-procedure',
	templateUrl: './new-procedure.component.html',
	styleUrls: ['../../../../assets/styles/new-procedure.css']
})

export class NewProcedureComponent implements OnChanges {

	@Output() onAddProcedure: EventEmitter<Procedure> = new EventEmitter<Procedure>();
	@Output() onClose:EventEmitter<number> = new EventEmitter<number>();
	@Input() title:string;

	public procedureName:string;
	public description:string;

	constructor(private sessionService:SessionService) {}

	saveProcedure() {
		if(this.validate()) {
			let user:User = this.sessionService.getUser();
			let procedure = new Procedure({ProcedureName: this.procedureName, Description: this.description, ProcedureDate: Date.now(), UserID: user.UID});
			this.onAddProcedure.emit(procedure);
		}
	}
	validate():boolean {
		let valid:boolean = true;
		if(!this.procedureName) {
			valid = false;
		}
		if(!this.description) {
			valid = false
		}
		return valid;
	}
	close(i=0) {
		this.onClose.emit(i);
	}
	ngOnChanges(changes:SimpleChanges) {
		if(changes['title']) {
			this.title = changes['title'].currentValue;
		}
	}

}