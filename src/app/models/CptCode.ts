import { Icd10Code } from "./Icd10Code";

export class CptCode {
	public CPTCode: string;
	public ShortDescriptor: string;
	public MediumDescriptor: string;
	public FullDescriptor: string;
	public AllIcd10Codes: Array<any>;
	public ICD10Codes: Array<Icd10Code>;

	constructor(o?:any) {
		/*
		if(cpt) {
			this.CPTCode = cpt.CPTCode;
			this.ShortDescriptor = cpt.ShortDescriptor;
			this.MediumDescriptor = cpt.MediumDescriptor;
			this.FullDescriptor = cpt.FullDescriptor;
		}
		*/
		this.ICD10Codes = new Array<Icd10Code>();
		this.AllIcd10Codes = new Array<Icd10Code>();
		Object.assign(this, o);
	}
}