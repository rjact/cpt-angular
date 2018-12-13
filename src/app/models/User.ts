export class User {
	public FirstName:string;
	public LastName:string;
	public UID: number;
	public UIdentifier: string;
	public GeographicCodeID: string;

	constructor(o?:any) {
		Object.assign(this,o);
	}
}