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
  inputId = "";
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


  partyHasId(party, id){
    console.log(this.inputId);
    // if the userid of the appointment is the userid that was input, include it in the appointments list
    if (id == this.inputId){
      return true;
    }

    if (this.inputId != ""){ // if the input is not empty
      // check each appointments party-list for the inputId
      for(var i = 0; i < party.length; i++) {
        if (party[i].toString() == this.inputId){ // if the input userid is found in the party-array another appointment, include the appointment in the list
          //console.log("Id found! " +party[i].toString() + "==" +this.inputId);
          return true;
        }
      }
    }

    return false; // if the id does not match any userID or is not found in the party list for any appointment
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
    this.inputId = id; // store the inputId

    this.posts = this.http.get(this.ROOT_URL);
    this.showAllAppointments = false;
    this.showAppointmentsForId = true;

    //this.posts = this.http.get(this.ROOT_URL+"&id="+id);
    //this.posts = this.http.get<Post[]>(this.ROOT_URL+"&id=705");

  }

}
