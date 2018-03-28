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

  //var bla: CreateAppointmentComponent = new CreateAppointmentComponent();

  readonly ROOT_URL = 'http://devtechtest.previewourapp.com/api/Appointment?providerEmail=benjiiman12@gmail.com';

  //appointment = "change me";
  myText = "";
  posts: Observable<any>; // type = Observable array of Post objects that follow the post-interface
  //posts: any;
  showAppointmentDetails = false; //
  showIdInput = true;




  constructor(private http: HttpClient) { }
  //appointmentDetails: String[];

  ngOnInit(){
  }

  onClick(post){

    var appointment: Appointment = {
      id: post.Id,
      description: post.Description,
      start: post.Start,
      end: post.End,
      notes: post.Notes,
      party: post.Party,
      providerEmail: post.ProviderEmail
    };

    //this.appointment=appointment;

    console.log(appointment);

    console.log(appointment.id);

    this.showAppointmentDetails = true;

  }

  getPosts(){
    //console.log(this.ROOT_URL);
    this.posts = this.http.get(this.ROOT_URL); // working with posts as any TYPE
    //.subscribe( value => console.log(value));

    //console.log(this.posts[2]);
    //for (let post of this.posts) {
      //console.log(post); // 1, "string", false
    //}

    //this.posts = this.http.get<Post[]>(this.ROOT_URL);
  }

  getPostByID(){

    //let params = new HttpParams().set('id','705');
    console.log("getPostByID called");
    this.posts = this.http.get(this.ROOT_URL+"&id="+this.myText);
    console.log(this.posts);
    //this.posts = this.http.get<Post[]>(this.ROOT_URL+"&id=705");

  }

}
