import { Component, OnInit } from '@angular/core';
import { Globals } from '../Globals';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-navigatecm',
  templateUrl: './navigatecm.component.html',
  styleUrls: ['./navigatecm.component.scss']
})
export class NavigatecmComponent implements OnInit {

  constructor(public globals: Globals,private route: ActivatedRoute,private auth: AuthServiceService,private router: Router) { }

  ngOnInit() {
  }
  Logout(){
    this.auth.signOut();
    this.router.navigate(["/"]);
}

}
