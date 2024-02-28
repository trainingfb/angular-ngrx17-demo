import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import DemoCounterComponent from './demo-counter.component';

describe('Demo Counter', () => {
  let store: MockStore;
  let component: DemoCounterComponent;
  let fixture: ComponentFixture<DemoCounterComponent>;
  const initialState = { counter: { value: 1, multiplier: 10 } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        DemoCounterComponent,
        provideMockStore({
          initialState,
        }),
        // other providers
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoCounterComponent);
    store = TestBed.inject(MockStore);
    component = TestBed.inject(DemoCounterComponent);
    fixture.detectChanges(); // To trigger change detection and any associated reactions
  });

  it('should display default values', () => {
    const h1 = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(h1.textContent).toContain(`demo-counter works! 1 - 10 - 3`);
    // expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should update outputs', () => {
    store.setState( { counter: { value: 2, multiplier: 10 } } );
    fixture.detectChanges(); // To trigger change detection and any associated reactions
    // store.refreshState();



    const h1 = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(h1.textContent).toContain(`demo-counter works! 2 - 20 - 6`);
    // expect(guard.canActivate()).toBeObservable(expected);
  });
});
