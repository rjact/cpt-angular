import { Icd10Code } from "./Icd10Code";

export class CptCode {
	public CPTCode: string;
	public ShortDescriptor: string;
	public MediumDescriptio: string;
	public FullDescriptor: string;
	public AllIcd10Codes: Array<any>;
	public ICD10Codes: Array<Icd10Code>;

	constructor() {
		this.ICD10Codes = new Array<Icd10Code>();
		this.AllIcd10Codes = new Array<Icd10Code>();
	}
}