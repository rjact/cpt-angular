import { CptCode } from "./CptCode";
import { Patient } from './Patient';
import { Procedure } from "./Procedure";

export class Entry {
	public Patient:Patient;
	public Procedure:Procedure
	
	constructor() {
		this.Patient = new Patient();
		this.Procedure = new Procedure();
	}
}