import {Component, Input, OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
// import { Coffee } from '../interface/coffee';
// import { Coffee } from '../../data/coffee'


import { ApiService } from '../services/api.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PopupComponent} from '../popup/popup.component';
import { CoffeeHttpService } from '../coffee-http.service';
import { Coffee } from '../../data/coffee-data';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Observable } from 'rxjs';
import {UIRouterModule} from "@uirouter/angular";

// import { RouterModule, Routes } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-coffeelist',
  standalone: true,
	imports: [
		HeaderComponent,
		NgForOf,
		FormsModule,
		PopupComponent,
		SearchBarComponent,
		NgIf,
		UIRouterModule,
	],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit {
	@Input() successMessage: String = '';
	stage: Coffee []=[];
	coffee: Coffee []=[];

	selectedOption : string = '';
	count: any;
	delFlag : boolean = true;

	sortingoptions: string[] = ['Brand (A-Z)', 'Brand (Z-A)'];

	constructor(private apiService:ApiService, private http: HttpClient, private httpService: CoffeeHttpService) { }
	ngOnInit(): void {
		this.apiService.coffee().subscribe(response => {
			this.coffee = response;
			// this.coffee  = this.coffee.filter(o => o.active);
			this.count = this.coffee.length;
			// this.coffee = this.coffee.sort((a, b) => a.id> b.id? 1 : -1);
		});
		if(this.successMessage) {
			let alert = document.getElementById('top-alert')
			if(alert) (alert as HTMLFormElement).classList.add('show')
			setTimeout(function() {
				if(alert) (alert as HTMLFormElement).classList.remove('show')
			}, 3000);
		}
	}

	onSearch(searchResult: Observable<any>) {
		searchResult.subscribe(response => {
			this.coffee = response;
			this.count = this.coffee.length;
   		});
	}

	onSortChange() {
		let colname = '';
		let sortype = '';

		if (this.selectedOption == 'Brand (A-Z)') {
			colname = 'roaster';
			sortype = 'asc'
		}
		else if (this.selectedOption == 'Brand (Z-A)') {
			colname = '-roaster';
			sortype = 'desc'
		}
			this.apiService.sort(colname,sortype).subscribe(response => {
			this.coffee = response;
		});
	}

	clickView(id : any) {
	}

	clickDelete(cid : any) {
			console.log(cid);
			const todelete = this.coffee.filter(obj => obj.id == cid)[0];
			todelete.active = false;
			console.log(todelete);
			this.httpService.updateCoffee(todelete).subscribe(response => {
				console.log(response.status);
				// setTimeout(() => window.location.reload(), 1000);
			});

	}

	getdeleteflag(deleteFlag : boolean) {
		this.delFlag = deleteFlag;
	}


}







// var data = {
// 	id: cid,
// 	active: false,
// 	variety: todelete[0].variety,
// 	size: todelete[0].size,
// 	roast: todelete[0].roast,
// 	roaster: todelete[0].roaster,
// 	format: todelete[0].format,
// 	grind: todelete[0].grind,
// 	origin: todelete[0].origin,
// 	singleOrigin: todelete[0].singleOrigin,
// 	tastingNotes: todelete[0].tastingNotes,
// }
