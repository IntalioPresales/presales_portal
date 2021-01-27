import { Globals } from './../Globals';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { users } from '../Globals';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation-won',
  templateUrl: './navigation-won.component.html',
  styleUrls: ['./navigation-won.component.scss']
})
export class NavigationWonComponent implements OnInit {


  displayedColumns = ['navigate', 'appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
  dataSource: MatTableDataSource<opportunity>;
  fullname: any = '';
  dataSource1: any;
  users: any;
  x: any;
  appreviation: any = '';
  contactname: any = '';
  contacttitle: any = '';
  contactemail: any = '';
  contactnumber: any = '';
  previousprojectinfo: any = '';
  clienttype: any = '';
  numberofemployees: any = '';
  clientindustry: any = '';

  url: any = '';
  budegetrange: any = '';
  learn: any = '';
  id: any;
  recieveddate: any = '';
  clientsubmissiondate: any = '';
  projectdesc: any = '';
  otherobservation: any = '';
  deliverytimeline: any = '';
  oppstatus: any;
  requiredtechnology: any = '';
  chanceofWinning: any = '';
  competitors: any = '';
  budgetrange: any = '';
  rfpstatus: any = '';
  string: any[] = [];
  member: boolean = false;
  country: any = '';

  proposaltype: any = '';
  opportunities: opportunity[] = [];
  dueDate: any = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private db: AngularFirestore, private globals: Globals, private router: Router) {
    this.users = users;

  }
  ngOnInit() {

    if (this.globals.currentuser.firstname == 'Mazen' && this.globals.currentuser.lastname == 'FARAH' || this.globals.currentuser.firstname == 'Stephanie' && this.globals.currentuser.lastname == 'AZARIAN' || this.globals.currentuser.firstname == 'Antoine' && this.globals.currentuser.lastname == 'HRAOUI' || this.globals.currentuser.firstname == 'MarieTherese' && this.globals.currentuser.lastname == 'AMMOUN') {

      this.users.forEach(element => {

        this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.id);


            this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                // console.log(doc.data());
                this.fullname = doc.data().fullname;
                this.contacttitle = doc.data().contacttitle;
                this.contactname = doc.data().contactname;
                this.contactemail = doc.data().contactemail;
                this.appreviation = doc.data().appreviation;
                this.contactnumber = doc.data().contactnumber;
                this.previousprojectinfo = doc.data().previousprojectinfo;
                this.clienttype = doc.data().clienttype;
                this.numberofemployees = doc.data().numberofemployees;
                this.clientindustry = doc.data().clientindustry;

              })
            });
            this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                // console.log(doc.data());
                this.budegetrange = doc.data().budgetrange;
                this.learn = doc.data().learn;
                this.url = doc.data().url;
                this.recieveddate = doc.data().recieveddate;
                this.clientsubmissiondate = doc.data().clientsubmissiondate;
                this.projectdesc = doc.data().projectdesc;
                this.otherobservation = doc.data().otherobservation;
                this.deliverytimeline = doc.data().deliverytimeline;
                this.chanceofWinning = doc.data().chanceofWinning;
                this.competitors = doc.data().competitors;
                this.requiredtechnology = doc.data().requiredtechnology;
              })
            });

            this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
              if (querySnapshot.empty) {
                this.rfpstatus = "";
                this.oppstatus = "";


              }
              querySnapshot.forEach(doc => {
                // console.log(doc.data());
                this.rfpstatus = doc.data().rfpstatus;
                this.oppstatus = doc.data().oppstatus;
                // console.log(this.rfpstatus);

              })
            })

            this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                this.string.push(doc.data().path);
              });

            });


            this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                // console.log(doc.data());
                this.dueDate = doc.data().dueDate;
                this.proposaltype = doc.data().proposaltype;
              })
              if (this.oppstatus === "Won") {
                this.globals.oppid = doc.id;
                const body = {
                  id: this.globals.oppid,
                  firstname: element.firstname,
                  lastname: element.lastname,
                  country: element.country,

                  fullname: this.fullname,
                  appreviation: this.appreviation,
                  contactname: this.contactname,
                  contacttitle: this.contacttitle,
                  contactemail: this.contactemail,
                  contactnumber: this.contactnumber,
                  previousprojectinfo: this.previousprojectinfo,
                  clienttype: this.clienttype,
                  numberofemployees: this.numberofemployees,
                  clientindustry: this.clientindustry,
                  string: this.string,

                  url: this.url,
                  budegetrange: this.budegetrange,
                  learn: this.learn,
                  recieveddate: this.recieveddate,
                  clientsubmissiondate: this.clientsubmissiondate,
                  projectdesc: this.projectdesc,
                  otherobservation: this.otherobservation,
                  deliverytimeline: this.deliverytimeline,
                  requiredtechnology: this.requiredtechnology,
                  chanceofWinning: this.chanceofWinning,
                  competitors: this.competitors,
                  budgetrange: this.budegetrange,

                  proposaltype: this.proposaltype,
                  dueDate: this.dueDate,

                  rfpstatus: this.rfpstatus
                }
                // console.log(this.globals.oppid);
                this.opportunities.push(createNewOpportunity(body));
                this.dataSource = new MatTableDataSource(this.opportunities);
                this.dataSource1 = this.opportunities;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.string = [];
                // console.log(this.opportunities);
              }
            });

          })
        });

      });

    }
    else if (this.globals.currentuser.firstname == 'George' && this.globals.currentuser.lastname == 'MAALOUF') {
      this.displayedColumns = ['appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
      this.users.forEach(element => {
        if (element.country == 'KSA') {

          this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.id);


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.fullname = doc.data().fullname;
                  this.contacttitle = doc.data().contacttitle;
                  this.contactname = doc.data().contactname;
                  this.contactemail = doc.data().contactemail;
                  this.appreviation = doc.data().appreviation;
                  this.contactnumber = doc.data().contactnumber;
                  this.previousprojectinfo = doc.data().previousprojectinfo;
                  this.clienttype = doc.data().clienttype;
                  this.numberofemployees = doc.data().numberofemployees;
                  this.clientindustry = doc.data().clientindustry;

                })
              });
              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.budegetrange = doc.data().budgetrange;
                  this.learn = doc.data().learn;
                  this.url = doc.data().url;
                  this.recieveddate = doc.data().recieveddate;
                  this.clientsubmissiondate = doc.data().clientsubmissiondate;
                  this.projectdesc = doc.data().projectdesc;
                  this.otherobservation = doc.data().otherobservation;
                  this.deliverytimeline = doc.data().deliverytimeline;
                  this.chanceofWinning = doc.data().chanceofWinning;
                  this.competitors = doc.data().competitors;
                  this.requiredtechnology = doc.data().requiredtechnology;
                })
              });

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
                if (querySnapshot.empty) {
                  this.rfpstatus = "";
                  this.oppstatus = "";


                }
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.rfpstatus = doc.data().rfpstatus;
                  this.oppstatus = doc.data().oppstatus;
                  // console.log(this.rfpstatus);

                })
              })

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  this.string.push(doc.data().path);
                });

              });


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.dueDate = doc.data().dueDate;
                  this.proposaltype = doc.data().proposaltype;
                })
                if (this.oppstatus === "Won") {
                  this.globals.oppid = doc.id;
                  const body = {
                    id: this.globals.oppid,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    country: element.country,

                    fullname: this.fullname,
                    appreviation: this.appreviation,
                    contactname: this.contactname,
                    contacttitle: this.contacttitle,
                    contactemail: this.contactemail,
                    contactnumber: this.contactnumber,
                    previousprojectinfo: this.previousprojectinfo,
                    clienttype: this.clienttype,
                    numberofemployees: this.numberofemployees,
                    clientindustry: this.clientindustry,
                    string: this.string,

                    url: this.url,
                    budegetrange: this.budegetrange,
                    learn: this.learn,
                    recieveddate: this.recieveddate,
                    clientsubmissiondate: this.clientsubmissiondate,
                    projectdesc: this.projectdesc,
                    otherobservation: this.otherobservation,
                    deliverytimeline: this.deliverytimeline,
                    requiredtechnology: this.requiredtechnology,
                    chanceofWinning: this.chanceofWinning,
                    competitors: this.competitors,
                    budgetrange: this.budegetrange,

                    proposaltype: this.proposaltype,
                    dueDate: this.dueDate,

                    rfpstatus: this.rfpstatus
                  }
                  // console.log(this.globals.oppid);
                  this.opportunities.push(createNewOpportunity(body));
                  this.dataSource = new MatTableDataSource(this.opportunities);
                  this.dataSource1 = this.opportunities;
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.string = [];
                  // console.log(this.opportunities);
                }
              });

            })
          });
        }
      });

    }
    else if (this.globals.currentuser.firstname == 'Ali' && this.globals.currentuser.lastname == 'SHARARA') {
      this.displayedColumns = ['appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
      this.users.forEach(element => {
        if (element.country == 'Qatar') {

          this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.id);


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.fullname = doc.data().fullname;
                  this.contacttitle = doc.data().contacttitle;
                  this.contactname = doc.data().contactname;
                  this.contactemail = doc.data().contactemail;
                  this.appreviation = doc.data().appreviation;
                  this.contactnumber = doc.data().contactnumber;
                  this.previousprojectinfo = doc.data().previousprojectinfo;
                  this.clienttype = doc.data().clienttype;
                  this.numberofemployees = doc.data().numberofemployees;
                  this.clientindustry = doc.data().clientindustry;

                })
              });
              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.budegetrange = doc.data().budgetrange;
                  this.learn = doc.data().learn;
                  this.url = doc.data().url;
                  this.recieveddate = doc.data().recieveddate;
                  this.clientsubmissiondate = doc.data().clientsubmissiondate;
                  this.projectdesc = doc.data().projectdesc;
                  this.otherobservation = doc.data().otherobservation;
                  this.deliverytimeline = doc.data().deliverytimeline;
                  this.chanceofWinning = doc.data().chanceofWinning;
                  this.competitors = doc.data().competitors;
                  this.requiredtechnology = doc.data().requiredtechnology;
                })
              });

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
                if (querySnapshot.empty) {
                  this.rfpstatus = "";
                  this.oppstatus = "";


                }
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.rfpstatus = doc.data().rfpstatus;
                  this.oppstatus = doc.data().oppstatus;
                  // console.log(this.rfpstatus);

                })
              })

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  this.string.push(doc.data().path);
                });

              });


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.dueDate = doc.data().dueDate;
                  this.proposaltype = doc.data().proposaltype;
                })
                if (this.oppstatus === "Won") {
                  this.globals.oppid = doc.id;
                  const body = {
                    id: this.globals.oppid,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    country: element.country,

                    fullname: this.fullname,
                    appreviation: this.appreviation,
                    contactname: this.contactname,
                    contacttitle: this.contacttitle,
                    contactemail: this.contactemail,
                    contactnumber: this.contactnumber,
                    previousprojectinfo: this.previousprojectinfo,
                    clienttype: this.clienttype,
                    numberofemployees: this.numberofemployees,
                    clientindustry: this.clientindustry,
                    string: this.string,

                    url: this.url,
                    budegetrange: this.budegetrange,
                    learn: this.learn,
                    recieveddate: this.recieveddate,
                    clientsubmissiondate: this.clientsubmissiondate,
                    projectdesc: this.projectdesc,
                    otherobservation: this.otherobservation,
                    deliverytimeline: this.deliverytimeline,
                    requiredtechnology: this.requiredtechnology,
                    chanceofWinning: this.chanceofWinning,
                    competitors: this.competitors,
                    budgetrange: this.budegetrange,

                    proposaltype: this.proposaltype,
                    dueDate: this.dueDate,

                    rfpstatus: this.rfpstatus
                  }
                  // console.log(this.globals.oppid);
                  this.opportunities.push(createNewOpportunity(body));
                  this.dataSource = new MatTableDataSource(this.opportunities);
                  this.dataSource1 = this.opportunities;
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.string = [];
                  // console.log(this.opportunities);
                }
              });

            })
          });
        }
      });

    }
    else if (this.globals.currentuser.firstname == 'Rony' && this.globals.currentuser.lastname == 'HONEIN') {
      this.displayedColumns = ['appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
      this.users.forEach(element => {
        if (element.country == 'France') {

          this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.id);


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.fullname = doc.data().fullname;
                  this.contacttitle = doc.data().contacttitle;
                  this.contactname = doc.data().contactname;
                  this.contactemail = doc.data().contactemail;
                  this.appreviation = doc.data().appreviation;
                  this.contactnumber = doc.data().contactnumber;
                  this.previousprojectinfo = doc.data().previousprojectinfo;
                  this.clienttype = doc.data().clienttype;
                  this.numberofemployees = doc.data().numberofemployees;
                  this.clientindustry = doc.data().clientindustry;

                })
              });
              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.budegetrange = doc.data().budgetrange;
                  this.learn = doc.data().learn;
                  this.url = doc.data().url;
                  this.recieveddate = doc.data().recieveddate;
                  this.clientsubmissiondate = doc.data().clientsubmissiondate;
                  this.projectdesc = doc.data().projectdesc;
                  this.otherobservation = doc.data().otherobservation;
                  this.deliverytimeline = doc.data().deliverytimeline;
                  this.chanceofWinning = doc.data().chanceofWinning;
                  this.competitors = doc.data().competitors;
                  this.requiredtechnology = doc.data().requiredtechnology;
                })
              });

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
                if (querySnapshot.empty) {
                  this.rfpstatus = "";
                  this.oppstatus = "";


                }
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.rfpstatus = doc.data().rfpstatus;
                  this.oppstatus = doc.data().oppstatus;
                  // console.log(this.rfpstatus);

                })
              })

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  this.string.push(doc.data().path);
                });

              });


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.dueDate = doc.data().dueDate;
                  this.proposaltype = doc.data().proposaltype;
                })
                if (this.oppstatus === "Won") {
                  this.globals.oppid = doc.id;
                  const body = {
                    id: this.globals.oppid,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    country: element.country,

                    fullname: this.fullname,
                    appreviation: this.appreviation,
                    contactname: this.contactname,
                    contacttitle: this.contacttitle,
                    contactemail: this.contactemail,
                    contactnumber: this.contactnumber,
                    previousprojectinfo: this.previousprojectinfo,
                    clienttype: this.clienttype,
                    numberofemployees: this.numberofemployees,
                    clientindustry: this.clientindustry,
                    string: this.string,

                    url: this.url,
                    budegetrange: this.budegetrange,
                    learn: this.learn,
                    recieveddate: this.recieveddate,
                    clientsubmissiondate: this.clientsubmissiondate,
                    projectdesc: this.projectdesc,
                    otherobservation: this.otherobservation,
                    deliverytimeline: this.deliverytimeline,
                    requiredtechnology: this.requiredtechnology,
                    chanceofWinning: this.chanceofWinning,
                    competitors: this.competitors,
                    budgetrange: this.budegetrange,

                    proposaltype: this.proposaltype,
                    dueDate: this.dueDate,

                    rfpstatus: this.rfpstatus
                  }
                  // console.log(this.globals.oppid);
                  this.opportunities.push(createNewOpportunity(body));
                  this.dataSource = new MatTableDataSource(this.opportunities);
                  this.dataSource1 = this.opportunities;
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.string = [];
                  // console.log(this.opportunities);
                }
              });

            })
          });
        }
      });

    }
    else if (this.globals.currentuser.firstname == 'Georges' && this.globals.currentuser.lastname == 'ZORBA') {
      this.displayedColumns = ['appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
      this.users.forEach(element => {
        if (element.country == 'UAE') {

          this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.id);


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.fullname = doc.data().fullname;
                  this.contacttitle = doc.data().contacttitle;
                  this.contactname = doc.data().contactname;
                  this.contactemail = doc.data().contactemail;
                  this.appreviation = doc.data().appreviation;
                  this.contactnumber = doc.data().contactnumber;
                  this.previousprojectinfo = doc.data().previousprojectinfo;
                  this.clienttype = doc.data().clienttype;
                  this.numberofemployees = doc.data().numberofemployees;
                  this.clientindustry = doc.data().clientindustry;

                })
              });
              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.budegetrange = doc.data().budgetrange;
                  this.learn = doc.data().learn;
                  this.url = doc.data().url;
                  this.recieveddate = doc.data().recieveddate;
                  this.clientsubmissiondate = doc.data().clientsubmissiondate;
                  this.projectdesc = doc.data().projectdesc;
                  this.otherobservation = doc.data().otherobservation;
                  this.deliverytimeline = doc.data().deliverytimeline;
                  this.chanceofWinning = doc.data().chanceofWinning;
                  this.competitors = doc.data().competitors;
                  this.requiredtechnology = doc.data().requiredtechnology;
                })
              });

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
                if (querySnapshot.empty) {
                  this.rfpstatus = "";
                  this.oppstatus = "";


                }
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.rfpstatus = doc.data().rfpstatus;
                  this.oppstatus = doc.data().oppstatus;
                  // console.log(this.rfpstatus);

                })
              })

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  this.string.push(doc.data().path);
                });

              });


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.dueDate = doc.data().dueDate;
                  this.proposaltype = doc.data().proposaltype;
                })
                if (this.oppstatus === "Won") {
                  this.globals.oppid = doc.id;
                  const body = {
                    id: this.globals.oppid,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    country: element.country,

                    fullname: this.fullname,
                    appreviation: this.appreviation,
                    contactname: this.contactname,
                    contacttitle: this.contacttitle,
                    contactemail: this.contactemail,
                    contactnumber: this.contactnumber,
                    previousprojectinfo: this.previousprojectinfo,
                    clienttype: this.clienttype,
                    numberofemployees: this.numberofemployees,
                    clientindustry: this.clientindustry,
                    string: this.string,

                    url: this.url,
                    budegetrange: this.budegetrange,
                    learn: this.learn,
                    recieveddate: this.recieveddate,
                    clientsubmissiondate: this.clientsubmissiondate,
                    projectdesc: this.projectdesc,
                    otherobservation: this.otherobservation,
                    deliverytimeline: this.deliverytimeline,
                    requiredtechnology: this.requiredtechnology,
                    chanceofWinning: this.chanceofWinning,
                    competitors: this.competitors,
                    budgetrange: this.budegetrange,

                    proposaltype: this.proposaltype,
                    dueDate: this.dueDate,

                    rfpstatus: this.rfpstatus
                  }
                  // console.log(this.globals.oppid);
                  this.opportunities.push(createNewOpportunity(body));
                  this.dataSource = new MatTableDataSource(this.opportunities);
                  this.dataSource1 = this.opportunities;
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.string = [];
                  // console.log(this.opportunities);
                }
              });

            })
          });
        }
      });

    }
    else if (this.globals.currentuser.firstname == 'Hussein' && this.globals.currentuser.lastname == 'ABDALLAH') {
      this.displayedColumns = ['appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
      this.users.forEach(element => {
        if(element.country=='France'||element.country=='Morocco'||element.country=='Algeria'||element.country=='Qatar'){

          this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.id);


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.fullname = doc.data().fullname;
                  this.contacttitle = doc.data().contacttitle;
                  this.contactname = doc.data().contactname;
                  this.contactemail = doc.data().contactemail;
                  this.appreviation = doc.data().appreviation;
                  this.contactnumber = doc.data().contactnumber;
                  this.previousprojectinfo = doc.data().previousprojectinfo;
                  this.clienttype = doc.data().clienttype;
                  this.numberofemployees = doc.data().numberofemployees;
                  this.clientindustry = doc.data().clientindustry;

                })
              });
              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.budegetrange = doc.data().budgetrange;
                  this.learn = doc.data().learn;
                  this.url = doc.data().url;
                  this.recieveddate = doc.data().recieveddate;
                  this.clientsubmissiondate = doc.data().clientsubmissiondate;
                  this.projectdesc = doc.data().projectdesc;
                  this.otherobservation = doc.data().otherobservation;
                  this.deliverytimeline = doc.data().deliverytimeline;
                  this.chanceofWinning = doc.data().chanceofWinning;
                  this.competitors = doc.data().competitors;
                  this.requiredtechnology = doc.data().requiredtechnology;
                })
              });

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
                if (querySnapshot.empty) {
                  this.rfpstatus = "";
                  this.oppstatus = "";


                }
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.rfpstatus = doc.data().rfpstatus;
                  this.oppstatus = doc.data().oppstatus;
                  // console.log(this.rfpstatus);

                })
              })

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  this.string.push(doc.data().path);
                });

              });


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.dueDate = doc.data().dueDate;
                  this.proposaltype = doc.data().proposaltype;
                })
                if (this.oppstatus === "Won") {
                  this.globals.oppid = doc.id;
                  const body = {
                    id: this.globals.oppid,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    country: element.country,

                    fullname: this.fullname,
                    appreviation: this.appreviation,
                    contactname: this.contactname,
                    contacttitle: this.contacttitle,
                    contactemail: this.contactemail,
                    contactnumber: this.contactnumber,
                    previousprojectinfo: this.previousprojectinfo,
                    clienttype: this.clienttype,
                    numberofemployees: this.numberofemployees,
                    clientindustry: this.clientindustry,
                    string: this.string,

                    url: this.url,
                    budegetrange: this.budegetrange,
                    learn: this.learn,
                    recieveddate: this.recieveddate,
                    clientsubmissiondate: this.clientsubmissiondate,
                    projectdesc: this.projectdesc,
                    otherobservation: this.otherobservation,
                    deliverytimeline: this.deliverytimeline,
                    requiredtechnology: this.requiredtechnology,
                    chanceofWinning: this.chanceofWinning,
                    competitors: this.competitors,
                    budgetrange: this.budegetrange,

                    proposaltype: this.proposaltype,
                    dueDate: this.dueDate,

                    rfpstatus: this.rfpstatus
                  }
                  // console.log(this.globals.oppid);
                  this.opportunities.push(createNewOpportunity(body));
                  this.dataSource = new MatTableDataSource(this.opportunities);
                  this.dataSource1 = this.opportunities;
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.string = [];
                  // console.log(this.opportunities);
                }
              });

            })
          });
        }
      });

    }
    else if (this.globals.currentuser.firstname == 'Bilal' && this.globals.currentuser.lastname == 'HMEDEH') {
      this.displayedColumns = ['appreviation', 'firstname', 'lastname', 'country', 'learn', 'recieveddate', 'clientsubmissiondate', 'projectdesc', 'otherobservation', 'deliverytimeline', 'requiredtechnology', 'chanceofWinning', 'competitors', 'budgetrange', 'proposaltype', 'dueDate'];
      this.users.forEach(element => {
        if(element.country=='KSA'||element.country=='Lebanon'||element.country=='UAE'){

          this.db.firestore.collection(element.firstname + ' ' + element.lastname).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              // console.log(doc.id);


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Client-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.fullname = doc.data().fullname;
                  this.contacttitle = doc.data().contacttitle;
                  this.contactname = doc.data().contactname;
                  this.contactemail = doc.data().contactemail;
                  this.appreviation = doc.data().appreviation;
                  this.contactnumber = doc.data().contactnumber;
                  this.previousprojectinfo = doc.data().previousprojectinfo;
                  this.clienttype = doc.data().clienttype;
                  this.numberofemployees = doc.data().numberofemployees;
                  this.clientindustry = doc.data().clientindustry;

                })
              });
              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Opportunity-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.budegetrange = doc.data().budgetrange;
                  this.learn = doc.data().learn;
                  this.url = doc.data().url;
                  this.recieveddate = doc.data().recieveddate;
                  this.clientsubmissiondate = doc.data().clientsubmissiondate;
                  this.projectdesc = doc.data().projectdesc;
                  this.otherobservation = doc.data().otherobservation;
                  this.deliverytimeline = doc.data().deliverytimeline;
                  this.chanceofWinning = doc.data().chanceofWinning;
                  this.competitors = doc.data().competitors;
                  this.requiredtechnology = doc.data().requiredtechnology;
                })
              });

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Link').get().then(querySnapshot => {
                if (querySnapshot.empty) {
                  this.rfpstatus = "";
                  this.oppstatus = "";


                }
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.rfpstatus = doc.data().rfpstatus;
                  this.oppstatus = doc.data().oppstatus;
                  // console.log(this.rfpstatus);

                })
              })

              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Uploads').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  this.string.push(doc.data().path);
                });

              });


              this.db.firestore.collection(element.firstname + ' ' + element.lastname).doc(doc.id).collection('Submission-Details').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // console.log(doc.data());
                  this.dueDate = doc.data().dueDate;
                  this.proposaltype = doc.data().proposaltype;
                })
                if (this.oppstatus === "Won") {
                  this.globals.oppid = doc.id;
                  const body = {
                    id: this.globals.oppid,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    country: element.country,

                    fullname: this.fullname,
                    appreviation: this.appreviation,
                    contactname: this.contactname,
                    contacttitle: this.contacttitle,
                    contactemail: this.contactemail,
                    contactnumber: this.contactnumber,
                    previousprojectinfo: this.previousprojectinfo,
                    clienttype: this.clienttype,
                    numberofemployees: this.numberofemployees,
                    clientindustry: this.clientindustry,
                    string: this.string,

                    url: this.url,
                    budegetrange: this.budegetrange,
                    learn: this.learn,
                    recieveddate: this.recieveddate,
                    clientsubmissiondate: this.clientsubmissiondate,
                    projectdesc: this.projectdesc,
                    otherobservation: this.otherobservation,
                    deliverytimeline: this.deliverytimeline,
                    requiredtechnology: this.requiredtechnology,
                    chanceofWinning: this.chanceofWinning,
                    competitors: this.competitors,
                    budgetrange: this.budegetrange,

                    proposaltype: this.proposaltype,
                    dueDate: this.dueDate,

                    rfpstatus: this.rfpstatus
                  }
                  // console.log(this.globals.oppid);
                  this.opportunities.push(createNewOpportunity(body));
                  this.dataSource = new MatTableDataSource(this.opportunities);
                  this.dataSource1 = this.opportunities;
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.string = [];
                  // console.log(this.opportunities);
                }
              });

            })
          });
        }
      });

    }

  }


  ngAfterViewInit() {



  }


  getNumber(text) {
    var numb = text.match(/\d/g);
    numb = numb.join("");
    return numb;
  }
  Navigate(id: string, firstname, lastname) {
    var str = 'null';
    if (id.includes(str)) {
      this.x = {
        "id": str,
        "firstname": firstname,
        "lastname": lastname
      }
      this.globals.opportunitydata = this.x;
      this.router.navigate(['/viewopportunity']);
      return
    }
    else {
      var number = this.getNumber(id);
      this.x = {
        "id": number,
        "firstname": firstname,
        "lastname": lastname
      }
      this.globals.opportunitydata = this.x;
      this.router.navigate(['/viewopportunity']);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  Route() {
    if (this.globals.currentuser.firstname == 'Mazen' && this.globals.currentuser.lastname == 'FARAH' || this.globals.currentuser.firstname == 'Stephanie' && this.globals.currentuser.lastname == 'AZARIAN' || this.globals.currentuser.firstname == 'Antoine' && this.globals.currentuser.lastname == 'HRAOUI' || this.globals.currentuser.firstname == 'MarieTherese' && this.globals.currentuser.lastname == 'AMMOUN') {
      this.router.navigateByUrl('/navigatepresales')
    }
    else if (this.globals.currentuser.firstname == 'George' && this.globals.currentuser.lastname == 'MAALOUF' || this.globals.currentuser.firstname == 'Ali' && this.globals.currentuser.lastname == 'SHARARA' || this.globals.currentuser.firstname == 'Rony' && this.globals.currentuser.lastname == 'HONEIN' || this.globals.currentuser.firstname == 'Georges' && this.globals.currentuser.lastname == 'ZORBA' || this.globals.currentuser.firstname == 'Hussein' && this.globals.currentuser.lastname == 'ABDALLAH' || this.globals.currentuser.firstname == 'Bilal' && this.globals.currentuser.lastname == 'HMEDEH') {
      this.router.navigateByUrl('/navigatecm')
    }
    else {
      this.router.navigateByUrl('/navigate')
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
function createNewOpportunity(body: any): opportunity {

  return body;
}


/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
export interface opportunity {
  id: any;
  firstname: string;
  lastname: string;
  country: any;
  string: any[],

  fullname: any;
  appreviation: any;
  contactname: any;
  contacttitle: any;
  contactemail: any;
  contactnumber: any;
  previousprojectinfo: any;
  clienttype: any;
  numberofemployees: any;
  clientindustry: any;

  url: any;
  budegetrange: any;
  learn: any;
  recieveddate: any;
  clientsubmissiondate: any;
  projectdesc: any;
  otherobservation: any;
  deliverytimeline: any;
  requiredtechnology: any;
  chanceofWinning: any;
  competitors: any;
  budgetrange: any;

  proposaltype: any;
  dueDate: any;
  rfpstatus: any;

}


