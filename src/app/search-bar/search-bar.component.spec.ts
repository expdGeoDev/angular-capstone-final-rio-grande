import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Coffee} from '../../data/coffee-data';
import { SearchBarComponent } from './search-bar.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CoffeeHttpService } from '../coffee-http.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockCoffeeHTTPService: CoffeeHttpService;
  let COFFEES: { id: string; active: boolean; roaster: string; variety: null; size: number; roast: string; format: string; grind: number; origin: null; singleOrigin: boolean; tastingNotes: null; }[];

  beforeEach(async () => {
    COFFEES = [
			{
				"id": "1",
				"active": true,
				"roaster": "Tim Horton's",
				"variety": null,
				"size": 14,
				"roast": "dark",
				"format": "k-pod",
				"grind": 8,
				"origin": null,
				"singleOrigin": true,
				"tastingNotes": null
			}]
    mockCoffeeHTTPService = jasmine.createSpyObj({ findBySearchString: of(COFFEES) });
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent]
			,providers:[{ provide: CoffeeHttpService, useValue: mockCoffeeHTTPService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    //component = fixture.componentInstance;
    component = new SearchBarComponent(mockCoffeeHTTPService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return search result', () => {
		component.searchString = 'espresso';
    component.onSubmit();
    expect(component.searchResult).toBeTruthy();
  });

	it('should return 1 result', (done) => {
		component.searchString = 'espresso';
		component.onSubmit();
		expect(component.searchResult?.subscribe(coffees => expect (coffees.length).toEqual(1)));
		done();
	});
});
