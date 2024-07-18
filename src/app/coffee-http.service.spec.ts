import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CoffeeHttpService } from './coffee-http.service';
import { TestBed } from '@angular/core/testing';

describe('CoffeeHTTPService', ()=>{
	let mockCoffeeHTTPService;
	let httpTestingController: HttpTestingController;
	let service: CoffeeHttpService;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [
				CoffeeHttpService,
			]
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(CoffeeHttpService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('search', () => {

		it('should call get with the correct URL', () => {

			service.findBySearchString('esp').subscribe();

			const req = httpTestingController.expectOne('http://localhost:8100/coffee?roaster_like=esp|roast_like=esp|variety_like=esp|format_like=esp|tastingNotes_like=esp');
		});
	})
})
