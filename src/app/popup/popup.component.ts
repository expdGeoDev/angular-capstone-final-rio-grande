import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Coffee } from '../../data/coffee-data';


@Component({
  selector: 'app-popup',
  standalone: true,
	imports: [
	],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})

export class PopupComponent {

	deleteCoffee 	: boolean = false;

	@Output() emitFlag = new EventEmitter <boolean> ();

	userConfirm() {
		this.deleteCoffee = true;
		this.emitFlag.emit(this.deleteCoffee);
	}

}
