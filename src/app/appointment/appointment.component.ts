import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Appointment } from '../appointment-interface';
import { EditableAppointment } from '../editable-interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://devtechtest.previewourapp.com/api/Appointment?providerEmail=benjiiman12@gmail.com';

  appointments: Observable<any>; // type = Observable array of Post objects that follow the appointment-interface

  // initialise toggles for the html to show or hide based on the user-interaction
  showAllAppointments = false;
  showAppointmentsForId = false;
  showAppointmentDetails = false;
  showIdInput = true;

  updateResponse = null;

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

  // initialise empty editableAppointment boolean from the editable interface (toggles used when editing an appointment)
  editable: EditableAppointment = {
    id: false,
    description: false,
    start: false,
    end: false,
    notes: false,
    party: false
  };


  ngOnInit(){}

  /**
   * removes a specified note from the current appointment notes
   */
  removeNoteFromNotes(note,index){
    this.appointment.notes.splice(index, 1);
  }

  /**
   * removes a specified userid from the current appointment party
   */
  removeIdFromParty(id, index){
    this.appointment.party.splice(index, 1);
    console.log(this.appointment);
  }

  /**
   * get all appointments via http GET request (returned in json/xml format)
   */
  getAppointments(){
    this.appointments = this.http.get(this.ROOT_URL);
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
          //console.log("Id found! " +party[i].toString() + "==" +this.inputId);'
          return true;
        }
      }
    }

    return false; // if the id does not match any userID or is not found in the party list for any appointment
  }


  /**
   * connect to the API via put request, send the body - updates the appointment with the corresponding ID
   * @param: the current appointment object to send in the put body
   */
  updateAppointmentDetails(appointment){

    //console.log(appointment);

    this.http.put(this.ROOT_URL+"&id="+appointment.id,appointment) // send the json appointment in the body
    .subscribe(res => this.updateResponse = res); // subscribe to the http put request, set the response to variable (used in HTML to show text)
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
   * add a ID to the current appointment.party array, send the appointment json in PUT body
   * @param: appointment: the current appointment object to add the id to
   * @param: id: the string of the user-input id
   */
  addIdToParty(appointment, id){

    appointment.party.push(id); // push the param note to the appointment.notes array

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
  getAppointmentWithId(id) {

    this.inputId = id; // store the inputId

    if(id != "") {

      this.appointments = this.http.get(this.ROOT_URL)
      //.subscribe(response => this.getAppointmentByID(response)); // subscribe to the http put request, call the callback function

      this.showAllAppointments = false;
      this.showAppointmentsForId = true;
    } else {
      this.showAppointmentsForId = false; // if no input, don't display the table titles
    }
  }


}
