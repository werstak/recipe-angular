import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildListArticlesComponent } from './child-list-articles.component';

describe('ChildListArticlesComponent', () => {
  let component: ChildListArticlesComponent;
  let fixture: ComponentFixture<ChildListArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildListArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildListArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
