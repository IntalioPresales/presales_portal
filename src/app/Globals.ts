import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class Globals {
  processing: boolean = false;
  public searchText: any;
  dataresponse: any;
  isLoggedIn: boolean = false;
  currentusertype: any;
  id: any = localStorage.getItem('id');
  currentuser: any;
  oppid: any;
  string: any;
  folderviewsrc: any;
  opportunitydata: any;
  foldersrc: any;
  wonsrc: any;
  archivesrc: any;
  barchartsrc: any;
  salessrc: any;
  LoginImagesrc: any;
  Navpagesrc: any;
  buttonclicked: boolean = false;
  private toggleState = new Subject();
  public toggleStatee = this.toggleState.asObservable();
  public toggleVal = false;
  emitData() {
    this.toggleVal = !this.toggleVal;
    this.toggleState.next(this.toggleVal);
  }
}

export const users: any[] = [

  {
    "firstname": "hasan",
    "lastname": "rifaii",
    "country": "Lebanon",
    "currency": "LBP",
    "email": "hasan.ri25@gmail.com"
  },
  {
    "firstname": "Ahmed",
    "lastname": "SAAD",
    "country": "Eygpt",
    "currency": "EGP",
    "email": "ahmed.saad@dts-egypt.com"
  },
  {
    "firstname": "Yassine",
    "lastname": "ARRAB",
    "country": "Algeria",
    "currency": "USD",
    "email": "y.aarab@everteam-gs.com"
  },
  {
    "firstname": "Amer",
    "lastname": "ZAINALABDIN",
    "country": "KSA",
    "currency": "SAR",
    "email": "a.abdin@comptechco.com"
  },
  {
    "firstname": "Wissam",
    "lastname": "ROUHANA",
    "country": "Algeria",
    "currency": "USD",
    "email": "w.rouhana@everteam-gs.com"
  },
  {
    "firstname": "Karim",
    "lastname": "BADR",
    "country": "Egypt",
    "currency": "EGP",
    "email": "k.badr@everteam-gs.com"
  },
  {
    "firstname": "Ramez",
    "lastname": "ALKARA",
    "country": "Egypt",
    "currency": "EGP",
    "email": "r.alkarra@everteam-gs.com"
  },
  {
    "firstname": "Rony",
    "lastname": "HONEIN",
    "country": "France",
    "currency": "EUR",
    "email": "r.honein@ebsgs-fr.com"
  },
  {
    "firstname": "Hadi",
    "lastname": "ABDALLAH",
    "country": "France",
    "currency": "EUR",
    "email": "hadi.abdallah@ebsgs-fr.com"

  },
  {
    "firstname": "Mamar",
    "lastname": "MERABI",
    "country": "France",
    "currency": "EUR",
    "email": "m.merabi@ebsgs-fr.com"
  },
  {
    "firstname": "Georges",
    "lastname": "ARAMOUNY",
    "country": "France",
    "currency": "EUR",
    "email": "g.aramouny@everteam-gs.com"
  },
  {
    "firstname": "Bilal",
    "lastname": "HMEDEH",
    "country": "KSA",
    "currency": "SAR",
    "email": "b.hmedeh@everteam-gs.com"
  },
  {
    "firstname": "George",
    "lastname": "MAALOUF",
    "country": "KSA",
    "currency": "SAR",
    "email": "g.maalouf@everteam-gs.com"
  },
  {
    "firstname": "Roland",
    "lastname": "SALAMEH",
    "country": "Lebanon",
    "currency": "USD",
    "email": "r.salameh@everteam-gs.com"
  },
  {
    "firstname": "MarieTherese",
    "lastname": "AMMOUN",
    "country": "Lebanon",
    "currency": "USD",
    "email": "m.ammoun@everteam-gs.com"
  },
  {
    "firstname": "Jean-Pierre",
    "lastname": "LA-HAUSSE-DE-LALOUVIERE",
    "country": "Mauritius",
    "currency": "USD",
    "email": "jplhl@everteam-gs.com"
  },
  {
    "firstname": "Yassine",
    "lastname": "ABOU-KADRI",
    "country": "Morocco",
    "currency": "USD",
    "email": "y.aboukadri@everteam-gs.com"
  },
  {
    "firstname": "Yassine",
    "lastname": "ABOU KADRI",
    "country": "Morocco",
    "currency": "USD",
    "email": "y.aboukadri@everteam-gs.com"
  },
  {
    "firstname": "Maram",
    "lastname": "HUSSEIN",
    "country": "Qatar",
    "currency": "QAR",
    "email": "m.hussein@everteam-gs.com"
  },
  {
    "firstname": "Hussein",
    "lastname": "ABDALLAH",
    "country": "Qatar",
    "currency": "QAR",
    "email": "h.abdallah@everteam-gs.com"
  },
  {
    "firstname": "Ali",
    "lastname": "SHARARA",
    "country": "Qatar",
    "currency": "QAR",
    "email": "a.sharara@everteam-gs.com"
  },
  {
    "firstname": "Hussein",
    "lastname": "CHOKR",
    "country": "Qatar",
    "currency": "QAR",
    "email": "h.chokr@everteam-gs.com"
  },
  {
    "firstname": "Georges",
    "lastname": "ZORBA",
    "country": "UAE",
    "currency": "AED",
    "email": "g.zorba@everteam-gs.com"
  },
  {
    "firstname": "Adeel",
    "lastname": "RAHMAN",
    "country": "UAE",
    "currency": "AED",
    "email": "a.rahman@everteam-gs.com"
  },
  {
    "firstname": "Karl",
    "lastname": "MELKI",
    "country": "Lebanon",
    "currency": "USD",
    "email": "k.melki@everteam-gs.com"
  },
  {
    "firstname": "Samer",
    "lastname": "HOBEIKA",
    "country": "Lebanon",
    "currency": "USD",
    "email": "s.hobeika@everteam-gs.com"
  },
  {
    "firstname": "Salam",
    "lastname": "EID",
    "country": "Kuwait",
    "currency": "USD",
    "email": "salam.eid@worldtek.co"
  },
  {
    "firstname": "Mazen",
    "lastname": "FARAH",
    "country": "Lebanon",
    "currency": "LBP",
    "email": "m.farah@everteam-gs.com"
  },
  {
    "firstname": "Zeina",
    "lastname": "ATRISSI",
    "country": "KSA",
    "currency": "SAR",
    "email": "z.atrissi@everteam-gs.com"
  },
  {
    "firstname": "Mansour",
    "lastname": "HOBEIKA",
    "country": "Ghana",
    "currency": "GHS",
    "email": "mansour.hobeika@intalio.com"
  },
  {
    "firstname": "Stephanie",
    "lastname": "AZARIAN",
    "country": "Lebanon",
    "currency": "LBP",
    "email": "s.azarian@everteam-gs.com"
  },
  {
    "firstname": "Rita",
    "lastname": "JAWHAR",
    "country": "Qatar",
    "currency": "QAR",
    "email": "r.jawhar@everteam-gs.com"
  },
  {
    "firstname": "Wasfi",
    "lastname": "ELLOUZE",
    "country": "France",
    "currency": "EUR",
    "email": "w.ellouze@ebsgs-fr.com"

  },
  {
    "firstname": "Mohammad",
    "lastname": "HASSAN",
    "country": "Lebanon",
    "currency": "USD",
    "email": "m.hassan@everteam-gs.com"

  },
  {
    "firstname": "Antoine",
    "lastname": "HRAOUI",
    "country": "Lebanon",
    "currency": "USD",
    "email": "a.hraoui@everteam-gs.com"
  },
  {
    "firstname": "Karim",
    "lastname": "THOMAS",
    "country": "Qatar",
    "currency": "QAR",
    "email": "k.thomas@everteam-gs.com"
  },
  {
    "firstname": "Lara",
    "lastname": "KANAAN",
    "country": "Lebanon",
    "currency": "LBP",
    "email": "l.kanaan@everteam-gs.com"
  },
  {
    "firstname": "Yahya",
    "lastname": "ABIHAIDAR",
    "country": "Lebanon",
    "currency": "LBP",
    "email": "y.abihaidar@everteam-gs.com"
  },
  {
    "firstname": "Mohammed",
    "lastname": "Alkhamis",
    "country": "KSA",
    "currency": "SAR",
    "email": "m.Alkhamis@everteam-gs.com"
  }
]
