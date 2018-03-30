import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { AppointmentApiService } from './appointment-api.service';
import { AppointmentComponent } from './appointment/appointment.component';


@NgModule({
  declarations: [AppComponent, AppointmentComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [AppointmentApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }
