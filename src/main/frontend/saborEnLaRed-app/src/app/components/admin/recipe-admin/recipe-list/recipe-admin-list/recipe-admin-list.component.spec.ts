import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdminListComponent } from './recipe-admin-list.component';

describe('RecipeAdminListComponent', () => {
  let component: RecipeAdminListComponent;
  let fixture: ComponentFixture<RecipeAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeAdminListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
