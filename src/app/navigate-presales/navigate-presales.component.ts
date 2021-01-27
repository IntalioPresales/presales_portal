import { Component, OnInit } from '@angular/core';
import { Globals } from '../Globals';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-navigate-presales',
  templateUrl: './navigate-presales.component.html',
  styleUrls: ['./navigate-presales.component.scss']
})
export class NavigatePresalesComponent implements OnInit {

  constructor(public globals: Globals,private route: ActivatedRoute,private auth: AuthServiceService,private router: Router) { }

  ngOnInit() {
  //   var x={
  //     "firstname": "Mazen",
  //     "lastname":"FARAH",
  //     "country":"Lebanon",
  //     "currency":"LBP",
  //     "email":"m.farah@everteam-gs.com"
  //   };
  //   var y={
  //     "firstname": "Stephanie",
  //     "lastname":"AZARIAN",
  //     "country":"Lebanon",
  //     "currency":"LBP",
  //     "email":"s.azarian@everteam-gs.com"
  //   };
  //   var z={
  //     "firstname": "Antoine",
  //     "lastname":"HRAOUI",
  //     "country":"Lebanon",
  //     "currency":"USD",
  //     "email":"a.hraoui@everteam-gs.com"
  //   };
  //   var k={
  //     "firstname": "MarieTherese",
  //     "lastname":"AMMOUN",
  //     "country":"Lebanon",
  //     "currency":"USD",
  //     "email":"m.ammoun@everteam-gs.com"
  //   };

  //   this.route.params.subscribe(params => {
  //     // console.log(params);

  //     if(params['firstname']&&params['firstname']=="Mazen"){
  //       this.globals.currentuser=x;
  //       this.globals.isLoggedIn=true;

  //     }
  //     if(params['firstname']&&params['firstname']=="Stephanie"){
  //       this.globals.currentuser=y;
  //       this.globals.isLoggedIn=true;

  //     }
  //     if(params['firstname']&&params['firstname']=="Antoine"){
  //       this.globals.currentuser=z;
  //       this.globals.isLoggedIn=true;

  //     }
  //     if(params['firstname']&&params['firstname']=="MarieTherese"){
  //       this.globals.currentuser=k;
  //       this.globals.isLoggedIn=true;
  //     }
  //   })

  // }
  }

  Logout(){
      this.auth.signOut();
      this.router.navigate(["/"]);
  }

}
