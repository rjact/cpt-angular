import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';

import { CptCode } from '../../models/CptCode';
import { Entry } from '../../models/Entry';
import { Icd10Code } from '../../models/Icd10Code';
import { Sequence } from '../../models/Sequence';

@Component({
	selector: 'sequences',
  	templateUrl: './sequences.component.html',
  	styleUrls: [
		'../../../assets/styles/sequences.css'
  	]
})
export class SequencesComponent implements OnInit {
	public loading:boolean = true;
	private title:string = "Sequences";
	private sequences:Array<Sequence>;
	private cpts:Array<CptCode>;

	@Output() onClose:EventEmitter<number> = new EventEmitter<number>();
	@Output() onAddCpt:EventEmitter<CptCode> = new EventEmitter<CptCode>();

	constructor(private dataService: DataService){}
    
    ngOnInit():void {
		this.dataService.getSequences(-1).subscribe(seqs => {
			if(seqs.length > 0){
				this.sequences = seqs;
				this.loading = false;
			}
		})
	}
	
	close() {
		this.onClose.next(0);
	}

	drilldown(sectionId) {
		this.loading = true;
		this.dataService.getSequences(sectionId).subscribe(seqs => {
			if(seqs.length > 0){
				this.sequences = seqs;
				this.loading = false;
			} else {
				this.title = "CPT Codes";
				this.sequences = new Array<Sequence>();
				this.dataService.getCptsForSequence(sectionId).subscribe(cpts => {
					this.cpts = cpts;
					this.loading = false;
				})
			}
		})
	}
	selectCpt(cpt):void {
		this.onAddCpt.next(cpt);
	}
}
