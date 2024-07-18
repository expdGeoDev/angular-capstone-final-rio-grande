import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitybarComponent } from './utilitybar.component';

describe('UtilitybarComponent', () => {
  let component: UtilitybarComponent;
  let fixture: ComponentFixture<UtilitybarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilitybarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilitybarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
