import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FakeHeaderComponent } from './testing/mocks/fake-header.component';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    TestBed.overrideComponent(AppComponent, {
      remove: {
        imports: [HeaderComponent],
      },
      add: {
        imports: [FakeHeaderComponent],
      },
    });
  });

  it('deve renderizar o componente header', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const headerDebugEl = fixture.debugElement.query(By.css('app-header'));

    expect(headerDebugEl).toBeTruthy();
  });

  it('deve renderizar o componente router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const routerOutletDebugEl = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletDebugEl).toBeTruthy();
  });
});
