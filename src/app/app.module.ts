import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { GetRecordsComponent } from './get-records/get-records.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';


@NgModule({
  declarations: [AppComponent, GetRecordsComponent, CreateAppointmentComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
