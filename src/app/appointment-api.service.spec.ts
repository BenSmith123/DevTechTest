import { TestBed, inject } from '@angular/core/testing';

import { AppointmentApiService } from './appointment-api.service';

describe('AppointmentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentApiService]
    });
  });

  it('should be created', inject([AppointmentApiService], (service: AppointmentApiService) => {
    expect(service).toBeTruthy();
  }));
});
