import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;

  ngOnInit() {
    /*eslint quote-props: ["error", "as-needed"]*/
    /*eslint-env es6*/
    // It's a good idea to wrap keys in quotes to prevent mangling during minification since html references them by name
    this.signupForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl("male") // default select value
    });
  }
}
