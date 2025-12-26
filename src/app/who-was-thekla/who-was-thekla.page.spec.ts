import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhoWasTheklaPage } from './who-was-thekla.page';

describe('WhoWasTheklaPage', () => {
  let component: WhoWasTheklaPage;
  let fixture: ComponentFixture<WhoWasTheklaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoWasTheklaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoWasTheklaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});






