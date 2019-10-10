import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  ngOnInit() {
    /*eslint quote-props: ["error", "as-needed"]*/
    /*eslint-env es6*/
    // It's a good idea to wrap keys in quotes to prevent mangling during minification since html references them by name
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        )
      }),
      gender: new FormControl("male"), // default select value
      hobbies: new FormArray([])
    });

    // can subscribe to two observables on the form (or form control with .get()) to listen to value or status changes
    this.signupForm.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.signupForm.statusChanges.subscribe(status => {
      console.log(status);
    });

    // set entire form:
    this.signupForm.setValue({
      userData: {
        username: "username",
        email: "myemail@email.com"
      },
      gender: "male",
      hobbies: []
    });

    // set value on individual control:
    this.signupForm.patchValue({
      userData: {
        username: "username4"
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // You need to cast the returned value as a FormArray as shown below:
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  getHobbyControls() {
    // This is necessary for Angular 8 - you can't use signupForm.get in the template to get the Form Array
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [key: string]: boolean } {
    // checks if value of control is included on the forbidden names array
    // Note: -1 returns true, so you need to check that indexOf result is not equal to -1
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // Async Validator:
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailisForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
