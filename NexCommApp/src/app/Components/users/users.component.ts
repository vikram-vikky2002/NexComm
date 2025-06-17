import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../Models/user';
import { UserManagementService } from '../../services/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   showAddUserForm = false;
  userList: Iuser[] = [];
  currentDate: Date = new Date();
  roles: string[] = ['Admin', 'User', 'Mod'];

  message: string = '';
  isEditMode: boolean = false;
    user: Iuser = {
    userId: 0,
    userName: "",
    role: "",
    emailId: "",
    phone: "",
    newUser: false,
    password: "",
    live: true,
    isAdmin: false
  };
  constructor(private UService: UserManagementService,private router :Router) {}

  ngOnInit(): void {
    this.fetchUsers(); // Optional if you have a GET API
  }
    toggleAddUser() {
    this.resetForm(); // Clear previous data
    this.isEditMode = false;
    this.showAddUserForm = !this.showAddUserForm;
  }
   saveUser() {
    if (this.isEditMode) {
      this.UService.updateUser(this.user).subscribe(res => {
        this.fetchUsers();
        this.message = 'User updated successfully';
        this.showAddUserForm = false;
        alert('User  details Updated Successfully')
      });
    } else {
      this.UService.addUser(this.user).subscribe(res => {
        this.fetchUsers();
        this.message = 'User added successfully';
        this.showAddUserForm = false;
        alert('User Added Successfully')
      });
    }
  }

  editUser(user: Iuser) {
    this.user = { ...user };
    this.isEditMode = true;
    this.showAddUserForm = true;
  }

  deleteUser(id: number) {
    this.UService.deleteUser(id).subscribe(res => {
      this.fetchUsers();
      this.message = 'User deleted successfully';
      alert("deleted successfully");
    });
  }

  resetForm() {
    this.user = {
      userId: 0,
      userName: "",
      role: "",
      emailId: "",
      phone: "",
      newUser: false,
      password: "",
      live: true,
      isAdmin: false
    };
    this.isEditMode = false;
  }
  cancel() {
  window.location.reload();
}

  fetchUsers() {
    this.UService.getAllUsers().subscribe(
    (data: Iuser[]) => {
      this.userList = data;
    },
    (error) => {
      console.error('Error fetching users', error);
    }
  );
}}
