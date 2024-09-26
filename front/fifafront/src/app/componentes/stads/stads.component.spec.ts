import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadsComponent } from './stads.component';

describe('StadsComponent', () => {
  let component: StadsComponent;
  let fixture: ComponentFixture<StadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
