import { CptCode } from "./CptCode";
import { Icd10Code } from "./Icd10Code";

export class Procedure {
	public ProcedureID:number;
	public PatientID: number;
	public ProcedureDate: Date;
	public ProcedureName: string;
	public Description: string;
	public CptCodes: Array<CptCode>;
	public ProcedureCodes:any;
	public Editable:boolean;

	constructor(o?:any) {
		if(o) {
			if(isNaN(o.ProcedureDate)) { o.ProcedureDate = o.ProcedureDate.substr(6); }
			o.ProcedureDate = new Date(parseInt(o.ProcedureDate));
			o.ProcedureName = o.ProcedureName.trim();
			o.Description = o.Description.trim();
			if(o.ProcedureCodes) {
				o.CptCodes = this.nestICD10s(o.ProcedureViews)
				
				delete o.ProcedureCodes;
			}
		}
		this.CptCodes = new Array<CptCode>();
		Object.assign(this,o);
	}

	private nestICD10s(data:Array<ProcedureView>):Array<CptCode> {
		let arr:Array<CptCode> = new Array<CptCode>();
		data.forEach(e => {
			let idx = arr.findIndex(c => c.CPTCode == e.CPTCode);
			if(idx == -1) {
				arr.push(new CptCode({CPTCode: e.CPTCode, MediumDescriptor: e.MediumDescriptor, CPTCodeFullDescription: e.FullDescriptor, ICD10Codes: new Array<Icd10Code>() }));
				idx = arr.length - 1;
			}
			arr[idx].ICD10Codes.push(new Icd10Code({CptCode: e.CPTCode, ICD_10CMCode: e.ICD_10CMCode, ICD_10CMFullDescription: e.ICD_10CMFullDescription, isIncluded: true, CrosswalkID: e.CrosswalkID }))
		})

		return arr;
	}
}

export class ProcedureView {
	public CPTCode:string;
	public CrosswalkID: number;
	public ICD_10CMCode:string;
	public ICD_10CMFullDescription:string;
	public MediumDescriptor:string;
	public ProcedureID: number;
	public CPTCodeFullDescription: string;
	public FullDescriptor:string;

	constructor(o?:any) {
		Object.assign(this,o);
	}
}