import { TestBed } from '@angular/core/testing';

import { EventEmiterService } from './event-emiter.service';

describe('EventEmiterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventEmiterService = TestBed.get(EventEmiterService);
    expect(service).toBeTruthy();
  });
});
