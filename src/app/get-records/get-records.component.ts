import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Appointment } from '../appointment-interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-get-records',
  templateUrl: './get-records.component.html',
  styleUrls: ['./get-records.component.css']
})
export class GetRecordsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://devtechtest.previewourapp.com/api/Appointment?providerEmail=benjiiman12@gmail.com';

  myString = "";
  posts: Observable<any>; // type = Observable array of Post objects that follow the post-interface
  //posts: any;
  showAllAppointments = false;
  showAppointmentsForId = false;
  showAppointmentDetails = false;
  showIdInput = true;
  inputID = "";
  note = "";

  appointment: Appointment = {
    id: 5,
    description: "",
    start: "",
    end: "",
    notes: [],
    party: [],
    providerEmail: ""
  };

  ngOnInit(){
  }

  onClick(post){

    this.appointment.id = post.Id;
    this.appointment.description = post.Description;
    this.appointment.start = post.Start;
    this.appointment.end = post.End;
    this.appointment.notes = post.Notes;
    this.appointment.party = post.Party;
    this.appointment.providerEmail = post.ProviderEmail;
    //this.appointment=appointment;

    console.log(this.appointment);

    this.showAppointmentDetails = true;
  }

  getPosts(){

    this.posts = this.http.get(this.ROOT_URL);
    this.showAllAppointments = true;
    this.showAppointmentsForId = false;
    //.subscribe(res => console.log(res.text())); // working with posts as any TYPE
    //this.posts = this.http.get<Post[]>(this.ROOT_URL);
  }

  addNote(appointment, note){
    console.log(appointment);
    appointment.notes.push(note);
    console.log(note);

    this.http.put(this.ROOT_URL+"&id="+appointment.id,appointment)
    .subscribe(res => console.log(res));
  }

  getPostByID(id){
    console.log("getPostByID called: id="+id);
    //let params = new HttpParams().set('id','705');

    this.posts = this.http.get(this.ROOT_URL);
    this.showAllAppointments = false;
    this.showAppointmentsForId = true;

    //this.posts = this.http.get(this.ROOT_URL+"&id="+id);
    //this.posts = this.http.get<Post[]>(this.ROOT_URL+"&id=705");

  }

}
