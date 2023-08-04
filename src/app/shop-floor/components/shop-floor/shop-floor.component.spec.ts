import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFloorComponent } from './shop-floor.component';

describe('ShopFloorComponent', () => {
  let component: ShopFloorComponent;
  let fixture: ComponentFixture<ShopFloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopFloorComponent]
    });
    fixture = TestBed.createComponent(ShopFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
