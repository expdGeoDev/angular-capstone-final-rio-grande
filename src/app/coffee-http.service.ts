import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from '../data/coffee-data';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CoffeeHttpService {
	baseUrl = 'http://localhost:8100';
	constructor(private client: HttpClient) {}

	getAllBeans(): Observable<Coffee[]> {
		return this.client.get<Coffee[]>(`${this.baseUrl}/coffees`);
	}

	findById(id: String): Observable<Coffee> {
		return this.client.get<Coffee>(`${this.baseUrl}/coffees/${id}`);
	}

	findBySearchString(search: string): Observable<Coffee[]>{
		return this.client.get<Coffee[]>(`${this.baseUrl}/coffees?q=${search}&attr=roaster_like,roast_like,variety_like,format_like,tastingNotes_like`);
	}

	createCoffee(coffee: Coffee):Observable<any> {
		return this.client.post(
			`${this.baseUrl}/coffees`,
			JSON.stringify(coffee),
			{headers: {'Content-Type': 'application/json'}, observe: 'response'}
		)
	}

	updateCoffee(coffee: Coffee):Observable<any> {
		return this.client.put(
			`${this.baseUrl}/coffees/${coffee.id}`,
			JSON.stringify(coffee),
			{headers: {'Content-Type': 'application/json'}, observe: 'response'}
		);
	}
}
