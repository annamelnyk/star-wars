import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemsListBlockComponent } from './main-items-list-block.component';

describe('MainItemsListBlockComponent', () => {
  let component: MainItemsListBlockComponent;
  let fixture: ComponentFixture<MainItemsListBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainItemsListBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainItemsListBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
