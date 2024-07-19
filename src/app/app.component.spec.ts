import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });



	it('should create', () => {
		let fixture = TestBed.createComponent(SearchBarComponent);
		let component = fixture.componentInstance;
		expect(component).toBeTruthy();
	});
});
