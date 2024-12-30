import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLocationConfigComponent } from './site-location-config.component';

describe('SiteLocationConfigComponent', () => {
  let component: SiteLocationConfigComponent;
  let fixture: ComponentFixture<SiteLocationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLocationConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLocationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
