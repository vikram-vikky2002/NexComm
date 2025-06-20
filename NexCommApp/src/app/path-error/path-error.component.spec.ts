import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathErrorComponent } from './path-error.component';

describe('PathErrorComponent', () => {
  let component: PathErrorComponent;
  let fixture: ComponentFixture<PathErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
