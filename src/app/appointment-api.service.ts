import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppointmentApiService {

  constructor(private http: HttpClient) { }

}
