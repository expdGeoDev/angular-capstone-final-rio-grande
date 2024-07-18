import {AddUpdateFormComponent} from "./add-update-form/add-update-form.component";
import {CoffeeHttpService} from "./coffee-http.service";
import {Ng2StateDeclaration, Transition} from "@uirouter/angular";
import {AddCoffeeButtonComponent} from "./add-coffee-button/add-coffee-button.component";

export const routerStates = [
	{
		name: 'add-coffee-button',
		url: "/add",
		component: AddCoffeeButtonComponent,
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
	}
]
