import { TestBed } from '@angular/core/testing';

import { Campana } from './campana';

describe('Campana', () => {
  let service: Campana;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Campana);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
