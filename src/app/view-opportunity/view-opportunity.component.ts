import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Country } from '../validators';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Globals } from './../Globals';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-view-opportunity',
  templateUrl: './view-opportunity.component.html',
  styleUrls: ['./view-opportunity.component.scss']
})
export class ViewOpportunityComponent implements OnInit {
  myForm: FormGroup;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  cities: any[] = [];
  x: string = '';
  ftypes: any[] = [];
  StatusDropdownList: boolean = false;
  selectedItems: any[] = [];
  selectedTypes: any[] = [];
  dropdownSettings: any = {};
  firstname: any;
  lastname: any;
  date = new Date('11/20/2019');
  id: any;
  userDetailsForm: FormGroup;
  presalesSubmissionForm: FormGroup;
  presalesSubmission: any;
  userdetails: any;
  generalinfoForm: FormGroup;
  generalinfo: any;
  opportunityForm: FormGroup;
  opportunity: any;
  accountDetailsForm: FormGroup;
  accountdetails: any;
  submissionDetailsForm: FormGroup;
  submissiondetails: any;
  types = [
    "Large Enterprise",
    "Small-sized business",
    "Medium-sized business"
  ];
  industries = [
    "Government",
    "Aerospace",
    "Agriculture",
    "Construction",
    "Education",
    "Information Technology",
    "Energy",
    "Financial services",
    "Food & Beverage",
    "Healthcare",
    "Hospitality",
    "Manufacturing",
    "Media",
    "Telecommunications",
    "Transport",
    "Other"
  ];

  status = [
    "In Progress",
    "Submitted",
    "No Go"
  ]
  opportunitystatus = [
    "Pending",
    "Won",
    "Lost",
    "Cancelled",
    "Retender"
  ]


  employees = [
    "Self-employed",
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1001-5000 employees",
    "5001-10,000 employees",
    "10,001+ employees"
  ];

  Timeline = [
    "6 Months",
    "12 Months",
    "24 Months",
    "Other"
  ];
  Chances = [
    "Low",
    "Medium",
    "High"
  ]

  currencies = [
    "USD",
    "EGP",
    "EUR",
    "SAR",
    "QAR",
    "AED"
  ]

  Technology = [
    "Liferay",
    "Sitecore",
    "Oracle",
    "Microsoft",
    "Talend",
    "Not specified",
    "Other"

  ];
  proptypes = [
    "Hard Copy",
    "Email",
    "Other"
  ];

  data = [
    "Public RFP",
    "Private Invitation",
    "Direct",
    "Other"
  ]
  submitted = false;
  actionbypresales: any;
  actionbymazen: any;
  datetostephanie: any;
  extension: any;
  oppstatus: any;
  rfpstatus: any;
  propvalue: any;
  ftype: any;
  reason: any;
  amount: any;
  resource: any;



  countries = [
    new Country('EGP', 'Egypt'),
    new Country('EUR', 'France'),
    new Country('USD', 'Lebanon'),
    new Country('QAR', 'Qatar'),
    new Country('USD', 'Kuwait'),
    new Country('AED', 'UAE'),
    new Country('USD', 'Algeria'),
    new Country('USD', 'Morocco'),
    new Country('USD', 'Mauritius'),
    new Country('SAR', 'KSA'),
    new Country('', 'Other')
  ];
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
  oppstatusindex: any;
  rfpstatusindex: any;
  ftypeindex: any;
  otherobservation: any;
  deliverytimeline: any;
  requiredtechnology: any;
  chanceofWinning: any;
  competitors: any;
  budgetrange: any;
  chanceofWinningindex: any;
  timelineindex: any;
  technologyindex: any;
  country: any;
  string: any[] = [];
  countryindex: any;
  clienttypeindex: any;
  nbrofemployeesindex: any;
  clientindustryindex: any;
  learnindex: any;
  proposaltype: any;
  dueDate: any;
  proposaltypeindex: any;
  constructor(private router: Router, public globals: Globals, private route: ActivatedRoute, private fb: FormBuilder, private db: AngularFirestore, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    //    if(!this.globals.currentuser){
    //    var x={
    //   "firstname": "Mazen",
    //   "lastname":"FARAH",
    //   "country":"Lebanon",
    //   "currency":"LBP",
    //   "email":"m.farah@everteam-gs.com"
    // };
    //      this.globals.currentuser=x;
    //     this.globals.isLoggedIn=true;
    // }
    this.cities = [
      { item_id: 1, item_text: 'Stephanie Azarian' },
      { item_id: 2, item_text: 'Mazen Farah' },
      { item_id: 3, item_text: 'Yahya Abi Haidar' },
      { item_id: 4, item_text: 'Elida Oueiss' },
      { item_id: 5, item_text: 'Georges Bechara' },
      { item_id: 6, item_text: 'Lara Kanaan' },
      { item_id: 7, item_text: 'Mohammad Saab' },
      { item_id: 8, item_text: 'Hasan Rifai' },
      { item_id: 9, item_text: 'Wassim Samaha' },
      { item_id: 10, item_text: 'Richard Barakat' },
      // { item_id: 11, item_text: 'Georges Aramouny' }
      { item_id: 12, item_text: 'Bahaa Bou AKL' }
    ];

    this.ftypes = [
      { item_id: 1, item_text: 'Standard Products' },
      { item_id: 2, item_text: 'New Products' },
      { item_id: 3, item_text: 'Custom Solutions' },
      { item_id: 4, item_text: 'Portals and E-Services' },
    ]
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    console.log(this.globals.opportunitydata);

    // this.route.params.subscribe(params => {
    // console.log(params['firstname']);
    // console.log(params['lastname']);
    // console.log(params['id']);
    this.firstname = this.globals.opportunitydata.firstname;
    this.lastname = this.globals.opportunitydata.lastname;
    this.id = this.globals.opportunitydata.id;
    this.createForms();
    this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('General-Info').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        this.country = doc.data().country;
      })
    });
    this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Uploads').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        this.string.push(doc.data().path);
      });
    });

    this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Client-Details').get().subscribe(querySnapshot => {
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
    this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Submission-Details').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        this.dueDate = doc.data().dueDate;
        this.proposaltype = doc.data().proposaltype;

      })
    });
    this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).get().subscribe(querySnapshot => {
      var x = querySnapshot.get('submitted');
      if (x) {
        this.submitted = true;
        this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Link').get().subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.data());

            this.actionbypresales = doc.data().actionbypresales;
            this.actionbymazen = doc.data().actionbymazen;
            this.datetostephanie = doc.data().datetostephanie;
            this.extension = doc.data().extension;
            this.oppstatus = doc.data().oppstatus;
            this.rfpstatus = doc.data().rfpstatus;
            this.ftype = doc.data().ftype;
            this.reason = doc.data().reason;
            this.amount = doc.data().amount;
            this.propvalue = doc.data().propvalue;
            this.resource = doc.data().resource;
            this.selectedTypes = this.ftype;
            this.selectedItems = this.resource;
            this.createForms();
            this.selectedTypes = this.ftype;
            this.selectedItems = this.resource
            if (this.rfpstatus != '') {
              this.presalesSubmissionForm.get('rfpstatus').setValue(this.status[this.rfpstatusindex])
            }
            if (this.oppstatus != '') {
              this.presalesSubmissionForm.get('oppstatus').setValue(this.opportunitystatus[this.oppstatusindex])
            }
          })
        });
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Form was submitted before!',
          showConfirmButton: false,
          timer: 1500
        })
      }

    })
    this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Opportunity-Details').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
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
        this.createForms();
        this.opportunityForm.get('chance').setValue(this.Chances[this.chanceofWinningindex])
        this.opportunityForm.get('delivery').setValue(this.Timeline[this.timelineindex])
        this.opportunityForm.get('technology').setValue(this.Technology[this.technologyindex])
        this.generalinfoForm.get('country').setValue(this.countries[this.countryindex])
        this.userDetailsForm.get('type').setValue(this.types[this.clienttypeindex])
        this.userDetailsForm.get('industry').setValue(this.industries[this.clientindustryindex])
        this.userDetailsForm.get('size').setValue(this.employees[this.nbrofemployeesindex])
        this.submissionDetailsForm.get('proptype').setValue(this.proptypes[this.proposaltypeindex])
      });
    })
  }
  createForms() {
    this.StatusDropdownList = true;
    this.searchElement.nativeElement.click();
    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: [this.fullname],
      title: [this.contacttitle],
      name: [this.contactname],
      email: [this.contactemail],
      appreviation: [this.appreviation],
      number: [this.contactnumber],
      bio: [this.previousprojectinfo],
      type: new FormControl(this.types[this.clienttypeindex]),
      industry: new FormControl(this.industries[this.clientindustryindex]),
      size: new FormControl(this.employees[this.nbrofemployeesindex])
    });

    this.presalesSubmissionForm = this.fb.group({
      actionbypresales: [this.actionbypresales],
      actionbymazen: [this.actionbymazen],
      datetostephanie: [this.datetostephanie],
      extension: [this.extension],
      oppstatus: [''],
      rfpstatus: [''],
      ftype: [this.selectedTypes],
      reason: [this.reason],
      amount: [this.amount],
      propvalue: [this.propvalue],
      resource: [this.selectedItems]

    })


    this.generalinfoForm = this.fb.group({
      first_name: [this.firstname],
      last_name: [this.lastname],
      country: new FormControl(this.countries[this.countryindex])

    })

    this.industries.forEach((x, index) => {

      if (x == this.clientindustry) {
        this.clientindustryindex = index;

      }
    })

    this.opportunitystatus.forEach((x, index) => {

      if (x == this.oppstatus) {
        this.oppstatusindex = index;

      }
    })
    this.status.forEach((x, index) => {

      if (x == this.rfpstatus) {
        this.rfpstatusindex = index;

      }
    })
    this.ftypes.forEach((x, index) => {
      if (x == this.ftype) {
        this.ftypeindex = index;
      }
    })
    this.data.forEach((x, index) => {

      if (x == this.learn) {
        this.learnindex = index;

      }
    })
    this.proptypes.forEach((x, index) => {

      if (x == this.proposaltype) {
        this.proposaltypeindex = index;

      }
    })

    this.employees.forEach((x, index) => {

      if (x == this.numberofemployees) {
        this.nbrofemployeesindex = index;

      }
    })

    this.types.forEach((x, index) => {

      if (x == this.clienttype) {
        this.clienttypeindex = index;

      }
    })


    this.Chances.forEach((x, index) => {

      if (x == this.chanceofWinning) {
        this.chanceofWinningindex = index;

      }
    })

    this.countries.forEach((x, index) => {

      if (x.name == this.country) {
        this.countryindex = index;

      }
    })
    this.Timeline.forEach((x, index) => {

      if (x == this.deliverytimeline) {
        this.timelineindex = index;

      }
    })
    this.Technology.forEach((x, index) => {
      if (x == this.requiredtechnology) {
        this.technologyindex = index;
      }
    })

    this.opportunityForm = this.fb.group({
      recieveddate: [this.recieveddate],
      ClientSubmissionDate: [this.clientsubmissiondate],
      projectdesc: [this.projectdesc],
      otherobservation: [this.otherobservation],
      chance: new FormControl(this.Chances[this.chanceofWinningindex]),
      delivery: new FormControl(this.Timeline[this.timelineindex]),
      technology: new FormControl(this.Technology[this.technologyindex]),
      competitors: [this.competitors],
      url: [this.url],
      learn: new FormControl(this.data[this.learnindex]),
      budgetrange: [this.budegetrange]

    })


    this.submissionDetailsForm = this.fb.group({
      proptype: new FormControl(this.proptypes[this.proposaltypeindex]),
      dueDate: [this.dueDate]
    })

  }
  convert(str) {
    if (str == "") {
      return ""
    }
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  onItemSelect(item: any) {
    // console.log('onItemSelect', item);
    this.selectedItems.push(item)
    // console.log(this.selectedItems);


  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.globals.opportunitydata = null;
  }

  onItemSelectType(item: any) {
    this.selectedTypes.push(item);
  }

  onSelectAll(items: any) {
    // console.log('onSelectAll', items);
  }
  SetText() {
    this.x = this.presalesSubmissionForm.get('propvalue').value;
    //  console.log(this.x);

    if (this.x == null) {
      return
    }
    if (this.x.includes('$')) {
      return
    }
    this.presalesSubmissionForm.get('propvalue').setValue('$' + this.x);

  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }
  onSubmit(value, oppvalue) {

    this.opportunity = oppvalue;
    // console.log(value);
    if (value.propvalue == "$") {
      value.propvalue = ""
    }
    if (value.datetostephanie == null) {
      value.datetostephanie = "";
    }
    if (value.extension == null) {
      value.extension = "";
    }
    if (this.submitted == false) {
      this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Link').add({
        actionbypresales: value.actionbypresales,
        actionbymazen: value.actionbymazen,
        datetostephanie: this.convert(value.datetostephanie),
        extension: this.convert(value.extension),
        oppstatus: value.oppstatus,
        rfpstatus: value.rfpstatus,
        ftype: value.ftype,
        reason: value.reason,
        amount: value.amount,
        propvalue: value.propvalue,
        resource: value.resource
      })
      this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Opportunity-Details').get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          var document = this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Opportunity-Details').doc(doc.id);
          document.update({
            recieveddate: this.convert(this.opportunity.recieveddate),
            clientsubmissiondate: this.convert(this.opportunity.ClientSubmissionDate),
            projectdesc: this.opportunity.projectdesc,
            otherobservation: this.opportunity.otherobservation,
            deliverytimeline: this.opportunity.delivery,
            requiredtechnology: this.opportunity.technology,
            chanceofWinning: this.opportunity.chance,
            competitors: this.opportunity.competitors,
            learn: this.opportunity.learn,
            url: this.opportunity.url
          })
        })
      })
      this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).set({
        submitted: true
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully submitted',
        showConfirmButton: false,
        timer: 1500
      })
      this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).get().subscribe(querySnapshot => {
        this.submitted = querySnapshot.get('submitted');
      })
    }
    else {
      this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Link').get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          var document = this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Link').doc(doc.id);
          document.update({
            actionbypresales: value.actionbypresales,
            actionbymazen: value.actionbymazen,
            datetostephanie: this.convert(value.datetostephanie),
            extension: this.convert(value.extension),
            oppstatus: value.oppstatus,
            rfpstatus: value.rfpstatus,
            ftype: value.ftype,
            reason: value.reason,
            amount: value.amount,
            propvalue: value.propvalue,
            resource: value.resource
          })
        })
      })
      this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Opportunity-Details').get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          var document = this.db.collection(this.firstname + ' ' + this.lastname).doc('Opportunity ' + this.id).collection('Opportunity-Details').doc(doc.id);
          document.update({
            recieveddate: this.convert(this.opportunity.recieveddate),
            clientsubmissiondate: this.convert(this.opportunity.ClientSubmissionDate),
            projectdesc: this.opportunity.projectdesc,
            otherobservation: this.opportunity.otherobservation,
            deliverytimeline: this.opportunity.delivery,
            requiredtechnology: this.opportunity.technology,
            chanceofWinning: this.opportunity.chance,
            competitors: this.opportunity.competitors,
            learn: this.opportunity.learn,
            url: this.opportunity.url
          })
        })
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully updated',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

}
