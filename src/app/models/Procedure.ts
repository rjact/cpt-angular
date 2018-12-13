import { CptCode } from "./CptCode";

export class Procedure {
	public ProcedureID:number;
	public PatientID: number;
	public ProcedureDate: Date;
	public ProcedureName: string;
	public Description: string;
	public CptCodes: Array<CptCode>;
	public ProcedureCodes:any;

	constructor(o?:any) {
		if(o) {
			if(isNaN(o.ProcedureDate)) { o.ProcedureDate = o.ProcedureDate.substr(6); }
			o.ProcedureDate = new Date(parseInt(o.ProcedureDate));
			o.ProcedureName = o.ProcedureName.trim();
			o.Description = o.Description.trim();
		}
		this.CptCodes = new Array<CptCode>();
		Object.assign(this,o);
	}
}