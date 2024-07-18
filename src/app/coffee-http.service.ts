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
		return this.client.get<Coffee[]>(`${this.baseUrl}/coffee?roaster_like=${search}|roast_like=${search}|variety_like=${search}|format_like=${search}|tastingNotes_like=${search}`);
	}

	createCoffee(coffee: Coffee) {
		console.log('creating', JSON.stringify(coffee));
		this.client.post(
			`${this.baseUrl}/coffees`,
			JSON.stringify(coffee),
			{headers: {'Content-Type': 'application/json'}}
		).subscribe({
			next: (data) => {
				console.log(data);
			}
		});
	}

	updateCoffee(coffee: Coffee) {
		this.client.put(
			`${this.baseUrl}/coffees/${coffee.id}`,
			JSON.stringify(coffee),
			{headers: {'Content-Type': 'application/json'}}
		).subscribe({
			next: (data) => {
				console.log(data);
			}
		});
	}
}
