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

  //appointment = "change me";
  myText = "";
  myString = "";
  posts: Observable<any>; // type = Observable array of Post objects that follow the post-interface
  //posts: any;
  showAppointmentDetails = false; //
  showIdInput = true;
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

  //appointmentDetails: String[];

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

    //console.log(appointment.id);

    this.showAppointmentDetails = true;
  }

  getPosts(){
    //console.log(this.ROOT_URL);
    this.posts = this.http.get(this.ROOT_URL);
    //.subscribe(res => console.log(res.text())); // working with posts as any TYPE

    //this.posts = this.http.get<Post[]>(this.ROOT_URL);
  }

  addNote(appointment, note){
    console.log(appointment);
    appointment.notes.push(note);
    console.log(note);
    //this.posts = this.http.get(this.ROOT_URL+"&id=705");
    //this.http.get(this.ROOT_URL+"&id="+appointment.id).subscribe(res => console.log(res));

    this.http.put(this.ROOT_URL+"&id="+appointment.id,appointment)
    .subscribe(res => console.log(res));
  }

  getPostByID(){

    //let params = new HttpParams().set('id','705');
    console.log("getPostByID called");
    this.posts = this.http.get(this.ROOT_URL+"&id="+this.myText);
    console.log(this.posts);
    //this.posts = this.http.get<Post[]>(this.ROOT_URL+"&id=705");

  }

}
