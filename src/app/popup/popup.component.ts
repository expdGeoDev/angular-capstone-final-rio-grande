import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})

export class PopupComponent {

	deleteFlag : boolean = false;
	@Output() emitFlag = new EventEmitter <boolean> ();

	clickDelete() {
		this.deleteFlag = true;
		console.log(this.deleteFlag);
		this.emitFlag.emit(this.deleteFlag);
	}

}
