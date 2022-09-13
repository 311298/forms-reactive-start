import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders: string[] = ["male", "female"];
  forbiddenUsernames: string[] = ["chris", "anna"];

  signupFrom: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signupFrom = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([new FormControl("")]), // [new FormControl('cooking')]
    });
    // this.signupFrom.valueChanges.subscribe((value)=>{
    //   console.log(value)
    // })
    this.signupFrom.statusChanges.subscribe((value) => {
      console.log(value);
    });
    // this.signupFrom.setValue({
    //   'userData':{
    //     'username':'jack',
    //     'eamil':'java@java.com'
    //   },
    //   'gender':'male',
    //   'hobbies':[]
    // })
    // this.signupFrom.patchValue({
    //   'gender':'female'
    // })
  }

  onSubmit() {
    console.log(this.signupFrom);
  }

  addHobby() {
    (this.signupFrom.get("hobbies") as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }

  get controls() {
    return (this.signupFrom.get("hobbies") as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // forbiddenName1 : true
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { s: true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
