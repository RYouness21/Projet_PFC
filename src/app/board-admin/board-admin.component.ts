import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from '../_services/Role';
import { User } from '../_services/User';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  public users:User[]=[];
  public editUser!: User;
  public deleteUser!: User;
  //public roles:Role[]=[];
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
   // this.getRoles();
   // console.log(this.users.idrole);
     //   alert(this.users.id);
    this.userService.getAdminBoard().subscribe(
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
  console.log(this.users[9].roles);
  
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      
    }
    
    );
  }
  /*  public getRoles():void{
      this.userService.getRoles().subscribe(data=>{
    this.roles=data;
    //console.log(this.roles)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        
      }
      
      );
  }*/

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

  public onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(userr: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editUser = userr;
      button.setAttribute('data-target', '#updateUserModal');
      console.log(this.editUser);}
    if (mode === 'delete') {
      this.deleteUser = userr;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
