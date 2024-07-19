import { Component, OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EventEmitter } from '@angular/core';
// import { Coffee } from '../interface/coffee';
// import { Coffee } from '../../data/coffee'

import { ApiService } from '../services/api.service';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PopupComponent} from '../popup/popup.component';
import { CoffeeHttpService } from '../coffee-http.service';
import { Coffee } from '../../data/coffee-data';
import { AppComponent } from '../app.component';

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
	],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})

export class ListComponent implements OnInit {

	coffee					: Coffee []=[];
	coffeeCount			: any;
	selectedOption 	: string = '';
	toDeleteID			: any = 0;
	confirmDelete 	: boolean = false;
	deleteMessage		: boolean = false;
	sortingOptions	: string[] = ['Brand (A-Z)', 'Brand (Z-A)'];

	constructor(private apiService:ApiService, private http: HttpClient, private httpService: CoffeeHttpService) { }

	ngOnInit(): void {
		this.apiService.coffee().subscribe(response => {
			this.coffee = response;
			this.coffee  = this.coffee.filter(o => o.active);
			this.coffeeCount = this.coffee.length;
		});
		this.toDeleteID = 0;
		this.confirmDelete = false;
	}

	//Sort brand name based on user selection
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

	//Capture object ID when user clicks Delete button
	itemToDelete(cid : any) {
		this.toDeleteID = cid;
		console.log(this.toDeleteID)
	}

	//Get user confirmation through pop up modal
	getConfirmation(deleteFlag : boolean) {
		this.confirmDelete = deleteFlag;
		console.log(this.confirmDelete)
		if (this.confirmDelete && this.toDeleteID != 0) {
			this.deleteCoffee();
			this.confirmDelete = false;
			this.toDeleteID = 0;
		}
	}

	//Delete coffee item from list if confirmDelete flag is 'true'; set 'Active' = false
	deleteCoffee () {
		const toDelete = this.coffee.filter( obj => obj.id == this.toDeleteID)[0];
		toDelete.active = false;
		this.httpService.updateCoffee(toDelete).subscribe(response => {
			console.log(response.status);
		});
		setTimeout(() => window.location.reload(), 1000);
	}

	clickView(id : any) {}
	clickEdit(id : any) {}



	test () {
		this.deleteMessage    = true;
		setTimeout(() => (this.deleteMessage = false),2000);
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


// sort - this.coffee = this.coffee.sort((a, b) => a.id> b.id? 1 : -1);
