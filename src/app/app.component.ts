import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  //readonly ROOL_URL = 'https://jsonplaceholder.typicode.com';
  readonly ROOT_URL = 'http://devtechtest.previewourapp.com/api/Appointment?providerEmail=benjiiman12@gmail.com';

  posts: any;

  constructor(private http: HttpClient) {}

  getPosts(){
    console.log(this.ROOT_URL);
    this.posts = this.http.get(this.ROOT_URL);

  }

}
