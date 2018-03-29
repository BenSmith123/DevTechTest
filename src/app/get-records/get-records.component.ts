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

  posts: Observable<any>; // type = Observable array of Post objects that follow the appointment-interface

  // initialise toggles for the html to show or hide based on the user-interaction
  showAllAppointments = false;
  showAppointmentsForId = false;
  showAppointmentDetails = false;
  showIdInput = true;

  // initialise empty text fields for the HTML to use
  inputId = "";
  inputNote = "";

  // initialise an empty appointment that conforms to the interface array
  appointment: Appointment = {
    id: 0,
    description: "",
    start: "",
    end: "",
    notes: [],
    party: [],
    providerEmail: ""
  };

  ngOnInit(){}

  /**
   * get all appointments via http GET request (returned in json/xml format)
   */
  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
    this.showAllAppointments = true;
    this.showAppointmentsForId = false;
    //.subscribe(res => console.log(res.text())); // working with posts as any TYPE
    //this.posts = this.http.get<Post[]>(this.ROOT_URL);
  }

  /**
   * checks an appointment id and party-list for the user-input id
   * @param: party: list of ids in the appointment
   * @param: id: the id of the appointment
   */
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

  /**
   * add a note to the current appointment.note array, send the appointment json in PUT body
   * @param: appointment: the current appointment object to add the note to
   * @param: note: the string of the user-input note
   */
  addNote(appointment, note){

    appointment.notes.push(note); // push the param note to the appointment.notes array

    this.http.put(this.ROOT_URL+"&id="+appointment.id,appointment) // send the json appointment in the body
    .subscribe(res => console.log(res)); // subscribe to the http put request, log the response

    this.inputNote = ""; // reset the note variable to be empty for the next note
  }

  /**
   * when an appointment is clicked from the list, set the full appointment attributes to show in another html div
   * @param: the appointment that was clicked
   */
  onClickAppointment(appointment){
    this.appointment.id = appointment.Id;
    this.appointment.description = appointment.Description;
    this.appointment.start = appointment.Start;
    this.appointment.end = appointment.End;
    this.appointment.notes = appointment.Notes;
    this.appointment.party = appointment.Party;
    this.appointment.providerEmail = appointment.ProviderEmail;
    //this.appointment=appointment;
    //console.log(this.appointment);

    this.showAppointmentDetails = true;
  }

  /**
   * Http GET request to get the full json of appointments (filtered in the HTML)
   * @param: the user-input id
   */
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
