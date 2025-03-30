import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTileComponent } from './customer-tile.component';

describe('CustomerTileComponent', () => {
  let component: CustomerTileComponent;
  let fixture: ComponentFixture<CustomerTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
