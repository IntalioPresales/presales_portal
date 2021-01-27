
import { Component, OnInit } from '@angular/core';
import { Globals } from './Globals';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  LoginImg: HTMLImageElement;
  NavImg:HTMLImageElement;
  folderview:HTMLImageElement;
  folder:HTMLImageElement;
  archive:HTMLImageElement;
  barchart:HTMLImageElement;
  sales:HTMLImageElement;
  won:HTMLImageElement;
  title = 'angular-forms-and-validations';
  constructor(private globals:Globals,private swUpdate: SwUpdate) { }
  ngOnInit() {
    // this.LoginImg=new Image();
    // this.LoginImg.src='./assets/img/presales logo.png';
    this.NavImg=new Image();
    this.NavImg.src='./assets/img/5812.jpg';
    this.folderview=new Image();
    this.folderview.src='./assets/img/folder-view.png';
    this.folder=new Image();
    this.folder.src='./assets/img/folder.png';
    this.archive=new Image();
    this.archive.src='./assets/img/archive.png';
    this.barchart=new Image();
    this.barchart.src='./assets/img/bar-chart-d.png';
    this.sales=new Image();
    this.sales.src='./assets/img/sales.png';
    this.won=new Image();
    this.won.src='./assets/img/won.png';

    this.globals.salessrc=this.sales.src;
    this.globals.folderviewsrc=this.folderview.src;
    this.globals.foldersrc=this.folder.src;
    this.globals.archivesrc=this.archive.src;
    this.globals.barchartsrc=this.barchart.src;
    // this.globals.LoginImagesrc=this.LoginImg.src;
    this.globals.Navpagesrc=this.NavImg.src;
    this.globals.wonsrc=this.won.src;
    // this.serviceWorker();
  }

  serviceWorker(){
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });
  }
  }
}
