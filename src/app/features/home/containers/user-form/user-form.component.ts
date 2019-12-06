import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './../../../../common/models/user.interface';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  currentUser: User;
  isEditMode = false;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HomeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const uid = Number(params.get('id'));
      if (uid && uid !== null) {
        this.service.getUser(uid).subscribe(
          userData => {
            this.currentUser = userData;
            this.createUserForm(userData);
          },
          error => alert('Something went wrong getting this user. Maybe it was a newly created one? ===> ' + JSON.stringify(error))
        );
        this.isEditMode = true;
      } else {
        this.isEditMode = false;
        this.createUserForm();
      }
    });
  }

  createUserForm(userData = null) {
    this.userForm = this.formBuilder.group({
      name: new FormControl(userData ? userData.name : '', Validators.required),
      username: new FormControl(userData ? userData.username : '', Validators.required),
      email: new FormControl(userData ? userData.email : '', Validators.required),
      phone: new FormControl(userData ? userData.phone : '', Validators.required),
      website: new FormControl(userData ? userData.website : '', Validators.required),
      address: new FormGroup({
        street: new FormControl(userData ? userData.address.street : ''),
        suite: new FormControl(userData ? userData.address.suite : ''),
        city: new FormControl(userData ? userData.address.city : ''),
        zipcode: new FormControl(userData ? userData.address.zipcode : ''),
        geo: new FormGroup({
          lat: new FormControl(userData ? userData.address.geo.lat : ''),
          lng: new FormControl(userData ? userData.address.geo.lng : '')
        }),
      }),
      company: new FormGroup({
        name: new FormControl(userData ? userData.company.name : ''),
        catchPhrase: new FormControl(userData ? userData.company.catchPhrase : ''),
        bs: new FormControl(userData ? userData.company.bs : ''),
      }),
    });
  }

  handleSubmit() {

    if (this.isEditMode) {
      this.service.updateUser(this.currentUser.id, this.userForm.value).subscribe(
        response =>  {
          this.router.navigate(['home'], {state: {alteredUser : response }});
          // alert('The user was updated succesfully');
          // this.userForm.markAsPristine();
        },
        err => alert('There was an error updating this user: ' + JSON.stringify(err))
      );
    } else {
      this.service.createUser(this.userForm.value).subscribe(
        response =>  {
          this.router.navigate(['home'], {state: {newUser : response }});
          // debugger
          // alert('The user was created succesfully');
        },
        err => alert('User was not created, an error occured: ' + JSON.stringify(err))
      );
    }
  }

  handleCancel() {
    if (this.userForm.dirty) {
      if (confirm('There are unsaved changes in your form. Are you sure you want to cancel?')) {
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['home']);
    }
  }


}
