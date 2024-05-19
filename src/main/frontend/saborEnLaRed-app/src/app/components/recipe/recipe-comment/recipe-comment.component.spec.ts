import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCommentComponent } from './recipe-comment.component';

describe('RecipeCommentComponent', () => {
  let component: RecipeCommentComponent;
  let fixture: ComponentFixture<RecipeCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
