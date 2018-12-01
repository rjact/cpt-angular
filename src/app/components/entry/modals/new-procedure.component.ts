import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Procedure } from '../../../models/Procedure';

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

	constructor() {}

	saveProcedure() {
		if(this.validate()) {
			let procedure = new Procedure({ProcedureName: this.procedureName, Description: this.description, ProcedureDate: Date.now()});
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