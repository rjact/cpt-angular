import { isDate } from "util";

export class Patient {
	public PatientID:number;
	public PatientFirstName:string = '';
	public PatientLastName:string = '';
	public Gender:string;
	public DOB:Date;
	public EHRNumber:string = ''; 

	constructor(o?:any) {
		if(o) {
			o.DOB = new Date(parseInt(o.DOB.substr(6)));
			o.PatientFirstName = o.PatientFirstName.trim();
			o.PatientLastName = o.PatientLastName.trim();
			o.EHRNumber = o.EHRNumber.trim();
		}
		Object.assign(this, o);
	}
}