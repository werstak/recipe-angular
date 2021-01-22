import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildListRecipeComponent } from './child-list-recipe.component';

describe('ChildListRecipeComponent', () => {
  let component: ChildListRecipeComponent;
  let fixture: ComponentFixture<ChildListRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildListRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildListRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
