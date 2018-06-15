import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Icd10Code } from '../../models/Icd10Code';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'icd10codes',
    templateUrl: './icd10.component.html',
	styleUrls: ['../../../assets/styles/icd10.css']
})
export class Icd10Component implements OnInit, OnDestroy {
	private icd10codes:Array<Icd10Code>;
	private getIcd10Subscription:ISubscription;
	private loading:boolean = true;
	@Input() cpt:string;
	@Output() onAddIcd10:EventEmitter<Icd10Code> = new EventEmitter<Icd10Code>();
	@Output() onClose:EventEmitter<number> = new EventEmitter<number>();

	constructor(private dataService:DataService) {
	}

	addIcd10(icd10) {
		this.onAddIcd10.next(icd10);
	}
	close() {
		this.onClose.next(0);
	}
	
	ngOnInit() {
		this.getIcd10Subscription = this.dataService.getIcd10Codes(this.cpt).subscribe(codes => {
			this.icd10codes = codes;
			this.loading = false;
		})
	}

	ngOnDestroy() {
		if(this.getIcd10Subscription) { this.getIcd10Subscription.unsubscribe(); }
	}

}
