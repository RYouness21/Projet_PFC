import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_services/User';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content?: string;
  public users:User[]=[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  public getUsers():void{
    this.userService.getUsers().subscribe(data=>{
  this.users=data;
  
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      
    }
    
    );
  }

  public searchUsers(key: string): void {
    //console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if(user.username.toLowerCase().indexOf(key.toLowerCase())!=-1)
      {
        results.push(user)
      }

    }

    this.users = results;
    if (results.length === 0 || !key) {
     this.getUsers();
    // console.log('no users found');
    }
  }

}
