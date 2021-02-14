import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchProductComponent } from './fetch-product.component';

describe('FetchProductComponent', () => {
  let component: FetchProductComponent;
  let fixture: ComponentFixture<FetchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
