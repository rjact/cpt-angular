export class Icd10Code {
	public CPTCode: string;
	public CptCodeFullDescription:string;
	public ICD_10CMCode: string;
	public ICD_10CMFullDescription:string;
	public isIncluded: boolean = false;

	constructor(o?:any) {
		Object.assign(this,o);
	}
}