import { CptCode } from "./CptCode";

export class Entry {
	public Name: string;
	public Dob: Date;
	public ProcedureDate: Date;
	public Ehr: string;
	public CptCodes: Array<CptCode>;

	constructor() {
		this.CptCodes = new Array<CptCode>();
	}
}