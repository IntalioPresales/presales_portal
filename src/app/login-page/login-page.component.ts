import { HttpClient } from "@angular/common/http";
import { Globals } from "./../Globals";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { users } from "../Globals";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthServiceService } from '../Services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal1Component } from '../Modals/modal1/modal1.component';
import { ForgotPasswordComponent } from '../Modals/forgot-password/forgot-password.component';
import Swal from 'sweetalert2';
import { map, mergeMap } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { object } from "@amcharts/amcharts4/core";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  constructor(
    public http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public globals: Globals,
    private db: AngularFirestore,
    private auth: AuthServiceService
  ) { }
  users: any[] = [];
  submitted = false;
  incorrect = false;
  serverdata: any[] = [];
  angForm: FormGroup;
  ngOnInit() {
    // this.http
    //   .get<any>("https://presales-etgs.com/server/get")
    //   .subscribe(data => {
    //     this.serverdata = data.data;
    //   });
    // setTimeout(() => {
    //   console.log(this.serverdata);
    // this.serverdata.forEach(element => {
    // this.db.collection(element.GeneralDetails.first_name+' '+element.GeneralDetails.last_name).doc(element.id).collection('General-Info').add(element.GeneralDetails)
    // this.db.collection(element.GeneralDetails.first_name+' '+element.GeneralDetails.last_name).doc(element.id).collection('Client-Details').add(element.ClientDetails)
    // this.db.collection(element.GeneralDetails.first_name+' '+element.GeneralDetails.last_name).doc(element.id).collection('Opportunity-Details').add(element.OpportunityDetails)

    // this.db.collection(element.GeneralDetails.first_name+' '+element.GeneralDetails.last_name).doc(element.id).collection('Link').add(element.Link)
    // });

    // }, 2000);

    // this.firestoreService.colWithIds$('restaurants').pipe(
    //   switchMap((restaurants: any[]) => {
    //     const res = restaurants.map((r: any) => {
    //       return this.firestoreService
    //         .col$(`restaurants/${r.id}/ratings`)
    //         .pipe(
    //           map(ratings => Object.assign(restaurant, { ratings }))
    //         );
    //     });
    //     return combineLatest(...res);
    //   })
    // ).subscribe(restaurants => console.log(restaurants);

    // const users = this.db.collection('users').
    // this.db.collection('users_').add({
    //   date: new Date().toISOString(),
    //   field: 'test',
    //   details: {
    //     sub: "delta",
    //     id: "delta",
    //   },
    //   links: [
    //     {
    //       path: "123"
    //     }
    //   ]
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   })

    // const cachedUsers = this.db.collection('users_')
    //   .get({ source: 'cache' })
    //   .subscribe(d=>{
    //     console.log(d);
    //   })


    // const usersRef = this.db.collection('users_')


    // var this_ = this;
    // this.db.collection('users_', ref => ref.where("links.path", "==", '111')).valueChanges().subscribe(d => console.log(d));

    // var variable = this.db
    //   .collection('Mamar MERABI')
    //   .snapshotChanges()
    //   .pipe(
    //     map(arr => {
    //       return arr.map(snap => {
    //         let data = snap.payload.doc.data() as any
    //         const categ = { id: snap.payload.doc.id, ...data };

    //         const Link = usersRef.doc(categ.id).collection('Link').valueChanges()
    //           .pipe(
    //             map(data => {
    //               return { link: data };
    //             }));
    //         const GeneralInfo = usersRef.doc(categ.id).collection('General-Info').valueChanges()
    //           .pipe(
    //             map(data => {
    //               return { general: data };
    //             }));;
    //         const op = usersRef.doc(categ.id).collection('Opportunity-Details').valueChanges()
    //           .pipe(
    //             map(data => {
    //               return { op: data };
    //             }));

    //         const combinedList = combineLatest<any[]>(Link, GeneralInfo, op).pipe(
    //           map(arr => arr.reduce((acc, cur, dix) => {
    //             let key = Object.keys(cur)[0];
    //             let value = Object.values(cur)[0];
    //             console.log(value);


    //             return { ...acc, [key]: value }
    //             return acc.concat(cur)

    //           })),
    //         )

    //         combinedList.subscribe(d => console.log('comb', d));

    //         // the animalsubcollection, using the previous value as parameter
    //         return this_.db
    //           .collection(`Mansour HOBEIKA/${categ.id}/Link`)
    //           .valueChanges()
    //           .pipe(
    //             map(animalsub => {
    //               return { ...categ, links: animalsub };
    //             })
    //           )
    //       })
    //     }),
    //     mergeMap(result => combineLatest(result))
    //   )
    // variable.subscribe(data => {
    // })

    // this.db.collection('Mansour HOBEIKA')
    //   .get()
    //   .subscribe(
    //     (querySnapshot) => {
    //       console.log(querySnapshot);

    //       querySnapshot.forEach(function (doc) {
    //         this_.db.collection(`Mansour HOBEIKA/${doc.id}/links`)
    //           .get()
    //           .subscribe((linkSnp) => {
    //             querySnapshot.forEach(function (linkdoc) {
    //               console.table(linkdoc.data())

    //             });
    //           })

    //         // doc.data() is never undefined for query doc snapshots
    //         console.table(doc.data())
    //         console.log(doc.id, " => ", doc.data());
    //       });
    //     }
    //     , (err) => {
    //       console.log('error', err);
    //     }
    //   );


    this.db
      .collection("idcounter")
      .doc("Id Counter")
      .get()
      .subscribe(querySnapshot => {
        var x = querySnapshot.get("id");
        console.log(x);

        localStorage.setItem("id", x);
      });
    this.globals.isLoggedIn = false;
    this.angForm = this.fb.group({
      name: ["", Validators.required],
      last: ["", Validators.required]
    });
    this.users = users;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.angForm.controls;
  }
  open() {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(Modal1Component);
    modalRef.componentInstance.title = 'Sign up';
    modalRef.result.then((result) => {
      if (result) {
        this.auth.emailSignUp(result.email, result.password, result.displayname).then((data: any) => {
          alert('User Added Successfuly');

        }, err => {
          alert('Faild');

        });

      }
    });
  }
  async openforgetpass() {
    const { value: email } = await Swal.fire({
      title: 'Reset your password',
      html:
        '<p>Enter the email address associated with your account and we will send you the instructions for resetting your password.</p>',
      input: 'email',
      confirmButtonText: 'Reset password',
      inputPlaceholder: 'Enter your email address'
    })

    if (email) {
      this.auth.resetPassword(email);
      Swal.fire({
        position: 'center',
        icon: 'success',
        html: '<p style="font-size:18px;font-weight:bold">Please check your email and click on the provided link to reset your password.</p>'
      })
    }
    // const modalRef = this.modalService.open(ForgotPasswordComponent);
    // modalRef.componentInstance.title = 'Forgot password';
    // modalRef.result.then((result) => {
    //   if (result) {
    //     this.auth.resetPassword(result.email);
    //   }
    // });
  }
  // ngOnDestroy(): void {
  //  this.auth.signOut();
  // }

  submitLogin(firstname, lastname) {
    if (this.angForm.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = true;


    // ----------------------------
    // @ COMMENT ON LOCALHOST (@HASAN)
    // ----------------------------
    // this.auth.emailLogin(firstname, lastname)
    //   .then((data: any) => {

    //     // this.router.navigate(['/navigatepresales']);
    //     let x = this.auth.currentUser.user.displayName.split(" ");
    //     console.log(this.auth.currentUser);

    //     firstname = x[0];
    //     lastname = x[1];
    //     if (!this.auth.currentUser.user.emailVerified) {
    //       Swal.fire({
    //         icon: 'warning',
    //         title: 'Please verify your email address !',
    //         text: 'A verification link was sent to your email address.'
    //       })
    //       return;
    //     }
    // ----------------------------
    // @ COMMENT ON LOCALHOST
    // ----------------------------


    if (
      (firstname == "Mazen" && lastname == "FARAH") ||
      (firstname == "Stephanie" && lastname == "AZARIAN") ||
      (firstname == "Antoine" && lastname == "HRAOUI") ||
      (firstname == "MarieTherese" && lastname == "AMMOUN")
    ) {
      this.users.forEach(x => {
        if (x.firstname == firstname && x.lastname == lastname) {
          this.globals.currentuser = x;
          this.globals.isLoggedIn = true;
          this.globals.currentusertype = "admin";
          this.router.navigate(["/navigatepresales"]);
        }
      });
      return;
    }
    else if (
      (firstname == "George" && lastname == "MAALOUF") ||
      (firstname == "Ali" && lastname == "SHARARA") ||
      (firstname == "Rony" && lastname == "HONEIN") ||
      (firstname == "Georges" && lastname == "ZORBA") ||
      (firstname == "Hussein" && lastname == "ABDALLAH") ||
      (firstname == "Bilal" && lastname == "HMEDEH")
    ) {
      this.users.forEach(x => {
        if (x.firstname == firstname && x.lastname == lastname) {
          this.globals.currentuser = x;
          this.globals.currentusertype = "user-cm";
          this.globals.isLoggedIn = true;
          this.router.navigate(["/navigatecm"]);
        }
      });
      return;
    }
    else {
      this.users.forEach(x => {
        if (x.firstname == firstname && x.lastname == lastname) {
          this.globals.currentuser = x;
          this.globals.currentusertype = "user";
          this.globals.isLoggedIn = true;
          this.router.navigate(["/navigate"]);
        }
      });
    }
    // })

    // .catch((err) => {
    //   this.incorrect = true;
    // })
    // }, err => {
    //   this.incorrect = true;

    // });

  }
}
