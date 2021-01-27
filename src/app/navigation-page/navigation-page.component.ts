import { Globals } from './../Globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-page',
  templateUrl: './navigation-page.component.html',
  styleUrls: ['./navigation-page.component.scss']
})
export class NavigationPageComponent implements OnInit {
  constructor(public globals:Globals) { }

  ngOnInit() {
  }

}
