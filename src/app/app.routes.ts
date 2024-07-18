import {AddUpdateFormComponent} from "./add-update-form/add-update-form.component";
import {CoffeeHttpService} from "./coffee-http.service";
import {Ng2StateDeclaration, Transition} from "@uirouter/angular";
import { DetailsComponent } from "./details/details.component";
import { ListComponent } from './list/list.component';
import { PopupComponent } from './popup/popup.component';

export const routerStates = [
		{
		name: 'details',
		url: '/details',
		component: DetailsComponent,
		label: 'Details View',
	},
  {

    
		name: 'add-update-form',
		url: '/add-update-form',
		component: AddUpdateFormComponent,
		params: {
			coffeeId: {
				type: 'any',
				value: '0'
			}
		},
		resolve: [
			{
				token: "coffeeId",
				deps: [Transition, CoffeeHttpService],
				resolveFn: (trans: Transition) => trans.params()['coffeeId']
			}
		]
	},
	{
		name: 'app-coffeelist',
		url: '/coffees',
		component: ListComponent,
		label: 'List of Coffees',
	},

	{
		name: 'app-popup',
		url: '/popup',
		component: PopupComponent,
		label: 'Pop up Modal',
	}
]
