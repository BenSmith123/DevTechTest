import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { GetRecordsComponent } from './get-records/get-records.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
  declarations: [AppComponent, GetRecordsComponent, CreateAppointmentComponent, ListItemComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
