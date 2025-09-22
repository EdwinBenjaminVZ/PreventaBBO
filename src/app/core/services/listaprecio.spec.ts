import { TestBed } from '@angular/core/testing';

import { Listaprecio } from './listaprecio';

describe('Listaprecio', () => {
  let service: Listaprecio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Listaprecio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
