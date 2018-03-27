import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post-interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-get-records',
  templateUrl: './get-records.component.html',
  styleUrls: ['./get-records.component.css']
})
export class GetRecordsComponent implements OnInit {

  //readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  readonly ROOT_URL = 'http://devtechtest.previewourapp.com/api/Appointment?providerEmail=benjiiman12@gmail.com';

  posts: Observable<any>; // type = Observable array of Post objects that follow the post-interface
  //posts: any;

  constructor(private http: HttpClient) { }

  ngOnInit(){
  }

  getPosts(){
    console.log(this.ROOT_URL);
    this.posts = this.http.get(this.ROOT_URL); // working with posts as any TYPE
    //this.posts = this.http.get<Post[]>(this.ROOT_URL);
  }

  getPostByID(){
    console.log("getPostByID called");
    //this.posts = this.http.post(this.ROOT_URL+)
  }

}
