import { Component } from '@angular/core';
import {UIRouterModule} from "@uirouter/angular";

@Component({
  selector: 'app-header',
  standalone: true,
	imports: [
		UIRouterModule
	],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
