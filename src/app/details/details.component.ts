import { Component, Input } from '@angular/core';
import { Coffee, FormatType, RoastType } from '../../data/coffee-data';
import { CoffeeHttpService } from '../coffee-http.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {

  coffeeId: string = '45'; // this value comes from the lokesh req
  // @Input() coffeeId: String = '0';

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
	
  constructor(private coffeeHTTPService: CoffeeHttpService){}
  coffee: Coffee = this.newCoffee;
  coffeeServiceResponse: Observable<Coffee> | undefined ;

  ngOnInit(){
    this.coffeeServiceResponse = this.coffeeHTTPService.findById(this.coffeeId)

    this.coffeeServiceResponse.subscribe({
      next: value =>
        Object.assign(this.coffee, value)
    })

  }
}
