import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Coffee } from '../interface/coffee'
import { Observable } from 'rxjs';
import { Coffee } from '../../data/coffee-data';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	apiURL= 'http://localhost:8100'
  constructor(private http:HttpClient) { }

	coffee() {
		const ep = '/coffees'
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };
		return this.http.get<any>(this.apiURL + ep )
	}

	sort(roaster:string, type:string) {
		return this.http.get<Coffee[]>(`${this.apiURL}/coffees?_sort=` + roaster + '&_order=' + type);
	}

	deleteCoffee(obj : Coffee, id : any)  {
		let headers = { 'Content-Type': 'application/json' };
		let options = { headers : headers, observer : 'response'  };
		var url = this.apiURL + '/coffees/' + id;
		return this.http.put<any>(url, obj, options);

	}





	// getCoffees(): Observable<Coffee[]> {
	// 	return this.http.get<Coffee[]>(`${this.apiURL}/coffees`);
	// }
	// return this.http.request('GET', this.heroesUrl, {responseType:'json', params});

}
