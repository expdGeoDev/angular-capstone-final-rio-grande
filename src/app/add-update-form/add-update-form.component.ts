import {Component, Input} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RoastType, FormatType, Coffee} from "../../data/coffee-data";
import {CoffeeHttpService} from "../coffee-http.service";
import {lastValueFrom, tap} from "rxjs";


@Component({
	selector: 'add-update-form',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './add-update-form.component.html',
	styleUrl: './add-update-form.component.css'
})

export class AddUpdateFormComponent {
	@Input() coffeeId: String = '0';

	newCoffee: Coffee = {
		id: '0',
		active: true,
		roaster: "",
		variety: null,
		size: 8,
		roast: 'blonde' as RoastType,
		format: 'k-pod' as FormatType,
		grind: undefined,
		origin: null,
		singleOrigin: false,
		tastingNotes: null
	}
	coffee: Coffee = this.newCoffee;
	pageTitle: String = '';
	coffeeForm = new FormGroup({
		roasterControl: new FormControl<string>('', Validators.required),
		varietyControl: new FormControl<string|null>(null),
		sizeControl: new FormControl<number|null>(null, Validators.required),
		roastControl: new FormControl<RoastType|null>(null, Validators.required),
		formatControl: new FormControl<FormatType|null>(null, Validators.required),
		grindControl: new FormControl<number|undefined>(undefined),
		originControl: new FormControl<string|null>(null),
		singleOriginControl: new FormControl<boolean|undefined>(false),
		tastingNotesControl: new FormControl<string|null>('')
	})


	constructor(private coffeeHTTPService: CoffeeHttpService){}

	isEditForm(): boolean {
		return this.coffeeId != '0';
	}

	getCoffeeById() {
		return this.coffeeHTTPService.findById(this.coffeeId)
	}

	async setCoffee() {
		return await lastValueFrom(this.getCoffeeById()
			.pipe(tap(response => {
				//TODO: handle error response from coffeeService
				if(response) {
					Object.assign(this.coffee, response)
				}
			}))
		);
	}
	async ngOnInit() {
		if(this.isEditForm()) {	await this.setCoffee();}
		this.pageTitle = this.isEditForm() ? 'Edit' : 'Add';
		this.coffeeForm.reset();
		this.coffeeForm.patchValue({
			formatControl: this.coffee.format,
			grindControl: this.coffee.grind,
			originControl: this.coffee.origin,
			roasterControl: this.coffee.roaster,
			singleOriginControl: this.coffee.singleOrigin,
			sizeControl: this.coffee.size,
			tastingNotesControl: this.coffee.tastingNotes,
			varietyControl: this.coffee.variety,
			roastControl: this.coffee.roast
		})
	}

	submitForm() {
		if(!this.isEditForm()) {this.coffee.id = crypto.randomUUID()}
		let formData = this.coffeeForm.getRawValue();
		if(
			formData.formatControl != null &&
			formData.roasterControl != null &&
			formData.singleOriginControl != null &&
			formData.sizeControl != null &&
			formData.roastControl != null
		) {
			this.coffee.format = formData.formatControl;
			this.coffee.origin = formData.originControl;
			this.coffee.roaster = formData.roasterControl;
			this.coffee.singleOrigin = formData.singleOriginControl;
			this.coffee.size = formData.sizeControl;
			this.coffee.tastingNotes = formData.tastingNotesControl;
			this.coffee.variety = formData.varietyControl;
			this.coffee.roast = formData.roastControl;
			if(formData.grindControl != null) {
				this.coffee.grind = formData.grindControl;
			}
		}

		this.isEditForm() ? this.coffeeHTTPService.updateCoffee(this.coffee).subscribe({
			next: (response) => {
				if (response.status > 200 && response.status < 300) {
					console.log('success')
				}
			}
		}) :
			this.coffeeHTTPService.createCoffee(this.coffee).subscribe({
				next: (response) => {
					if (response.status > 200 && response.status < 300) {
						console.log('success')
					}
				}
			});
	}
}
