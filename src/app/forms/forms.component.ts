import { Country } from './../validators/country.model';
import { Globals } from './../Globals';
import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
// import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";
// import { FileRestrictions, SelectEvent, RemoveEvent } from '@progress/kendo-angular-upload';
// import {
//   UsernameValidator,
//   PasswordValidator,
//   ParentErrorStateMatcher,
//   PhoneValidator
// } from '../validators';
// import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../uploads/shared/upload';
import { UploadService } from '../uploads/shared/upload.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
// Main task
task: AngularFireUploadTask;

// Progress monitoring
percentage: Observable<number>;

snapshot: Observable<any>;
@ViewChild('labelImport',{static:true})
labelImport: ElementRef;
// Download URL
downloadURL: Observable<string>;
public events: string[] = [];
public imagePreviews: any[] = [];
// public uploadRestrictions: FileRestrictions = {
//   allowedExtensions: ['.jpg', '.png']
// };

public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

// State for dropzone CSS toggling
isHovering: boolean;
  userDetailsForm: FormGroup;
  userdetails:any;
  id:any;
  uploadeddata:boolean=false;
  generalinfoForm:FormGroup;
  generalinfo:any;
  opportunityForm:FormGroup;
  opportunity:any;
  datatoupload:any;
  uploadclicked:boolean=false;
  accountDetailsForm: FormGroup;
  accountdetails:any;
  submissionDetailsForm:FormGroup;
  submissiondetails:any;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  selectedFiles: FileList;
  string:any='';
  currentUpload: Upload;
firstname:any;
lastname:any;
  // parentErrorStateMatcher = new ParentErrorStateMatcher();

  types = [
    "Large Enterprise",
    "Small-sized business",
    "Medium-sized business"
  ];
  industries= [
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

  Timeline=[
    "6 Months",
    "12 Months",
    "24 Months",
    "Other"
  ];
  Chances=[
    "Low",
    "Medium",
    "High"
  ]

  currencies=[
    "USD",
    "EGP",
    "EUR",
    "SAR",
    "QAR",
    "AED"
  ]
  Technology=[
    "Liferay",
    "Sitecore",
    "Oracle",
    "Microsoft",
    "Talend",
    "Not specified",
    "Other"

  ];
  proptypes=[
    "Hard Copy",
    "Email",
    "Other"
  ];

  data=[
    "Public RFP",
    "Private Invitation",
    "Direct",
    "Other"
  ]

  countries = [
    new Country('EGP', 'Egypt'),
    new Country('EUR', 'France'),
    new Country('USD', 'Lebanon'),
    new Country('QAR', 'Qatar'),
    new Country('USD','Kuwait'),
    new Country('AED', 'UAE'),
    new Country('USD','Algeria'),
    new Country('USD','Morocco'),
    new Country('USD','Mauritius'),
    new Country('GHS','Ghana'),
    new Country('SAR','KSA'),
    new Country('', 'Other')
  ];


  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Full name is required' }
    ],
    'first_name': [
      { type: 'required', message: 'First name is required' }
    ],
    'last_name': [
      { type: 'required', message: 'Last name is required' }
    ],
    'additionalinputs': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'bio': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'type': [
      { type: 'required', message: 'Please select your a client type' },
    ],
    'size': [
      { type: 'required', message: 'Please select your company size' },
    ],
    'birthday': [
      { type: 'required', message: 'Please insert your birthday' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ]
  };

  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }
  public url = 'https://us-central1-presales-request-326aa.cloudfunctions.net';

  constructor(private httpClient: HttpClient,private upSvc: UploadService,private fb: FormBuilder,private db:AngularFirestore,private storage: AngularFireStorage,private globals:Globals,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.createForms();
    this.id=localStorage.getItem('id');
    this.firstname=this.globals.currentuser.firstname;
    this.lastname=this.globals.currentuser.lastname;



  }
  detectFiles(event) {
    // console.log(event.target.files.length);
    this.datatoupload=event.target.files.length;
    if(event.target.files.length>=1&&this.uploadclicked==false){
      this.uploadeddata=true;
      this.toastr.info('Please press the upload button after selecting the files');
    }
    this.selectedFiles = event.target.files;
    this.labelImport.nativeElement.innerText = Array.from(this.selectedFiles)
    .map(f => f.name)
    .join(', ');

}
Route(){
  if(this.globals.currentuser.firstname=='Mazen'&&this.globals.currentuser.lastname=='FARAH'||this.globals.currentuser.firstname=='Stephanie'&&this.globals.currentuser.lastname=='AZARIAN'||this.globals.currentuser.firstname=='Antoine' && this.globals.currentuser.lastname=='HRAOUI'||this.globals.currentuser.firstname=='MarieTherese' && this.globals.currentuser.lastname=='AMMOUN'){
  this.router.navigateByUrl('/navigatepresales')
}
else if(this.globals.currentuser.firstname=='George'&&this.globals.currentuser.lastname=='MAALOUF'||this.globals.currentuser.firstname=='Ali'&&this.globals.currentuser.lastname=='SHARARA'||this.globals.currentuser.firstname=='Rony' && this.globals.currentuser.lastname=='HONEIN'||this.globals.currentuser.firstname=='Georges' && this.globals.currentuser.lastname=='ZORBA'||this.globals.currentuser.firstname=='Hussein' && this.globals.currentuser.lastname=='ABDALLAH'||this.globals.currentuser.firstname=='Bilal' && this.globals.currentuser.lastname=='HMEDEH'){
  this.router.navigateByUrl('/navigatecm')
}
else{
  this.router.navigateByUrl('/navigate')
}
}
sendMail(body:any): any {
  const url = `${this.url}/sendMail`;
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  return this.httpClient.post(url, body, { headers })
    .pipe(map(res => {
      return res;
    })).toPromise();
}
sendMailsales(body:any): any {
  const url = `${this.url}/sendMailsales`;
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  return this.httpClient.post(url, body, { headers })
    .pipe(map(res => {
      return res;
    })).toPromise();
}
sendMaillara(body:any): any {
  const url = `${this.url}/sendMaillara`;
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  return this.httpClient.post(url, body, { headers })
    .pipe(map(res => {
      return res;
    })).toPromise();
}
sendMailbackup(body:any): any {
  const url = `${this.url}/sendMailbackup`;
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  return this.httpClient.post(url, body, { headers })
    .pipe(map(res => {
      return res;
    })).toPromise();
}

uploadSingle() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.upSvc.pushUpload(this.currentUpload,this.firstname,this.lastname)
}

uploadMulti() {
  this.uploadclicked=true;
  if(this.datatoupload>=1){
  this.uploadeddata=false;
  }
  let files = this.selectedFiles
  let filesIndex = _.range(files.length)
  _.each(filesIndex, (idx) => {
    this.currentUpload = new Upload(files[idx]);
    this.upSvc.pushUpload(this.currentUpload,this.firstname,this.lastname)}
  )
}
onSearchChangesub(searchValue){
  var date1=searchValue;
  var date2=new Date();
  // To calculate the time difference of two dates
var Difference_In_Time = date1.getTime() - date2.getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

if(Difference_In_Days<14){
  Swal.fire({
    icon: 'error',
    title: 'Attention!',
    text: 'Any presales request, must have a minimum timeframe of Two (2) weeks from the date of receival as per our Service Level Agreement (SLA). Otherwise the opportunity will pass through an approval process for acceptance and Rejection.'
  })
}
}
onSearchChange(searchValue) {
  var date1=searchValue;
  var date2=new Date();
  // To calculate the time difference of two dates
var Difference_In_Time = date1.getTime() - date2.getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

if(Difference_In_Days<14){
  Swal.fire({
    icon: 'error',
    title: 'Attention!',
    text: 'Any presales request, must have a minimum timeframe of Two (2) weeks from the date of receival as per our Service Level Agreement (SLA). Otherwise the opportunity will pass through an approval process for acceptance and Rejection.'
  })
}


}
  createForms() {
    // matching passwords validation
    // this.matching_passwords_group = new FormGroup({
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required,
    //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    //   ])),
    //   confirm_password: new FormControl('', Validators.required)
    // }, (formGroup: FormGroup) => {
    //   return PasswordValidator.areEqual(formGroup);
    // });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: ['', Validators.required ],
      title: [''],
      name: [''],
      email: new FormControl('',Validators.email),
      appreviation: ['', Validators.required ],
      number: [''],
      bio: [""],
      type: new FormControl(this.types[0], Validators.required),
      industry: new FormControl(this.industries[0], Validators.required),
      size: new FormControl(this.employees[1], Validators.required)
    });
    var countryindex;
    var currencyindex;
    this.countries.forEach((x,index)=>{
      if(x.name==this.globals.currentuser.country){
        countryindex=index;

      }
    })

    this.currencies.forEach((x,index)=>{
      if(x==this.globals.currentuser.currency){
        currencyindex=index;

      }
    })

    this.generalinfoForm=this.fb.group({
      first_name: [this.globals.currentuser.firstname,Validators.required],
      last_name: [this.globals.currentuser.lastname,Validators.required],
      country: new FormControl(this.countries[countryindex], Validators.required)

    })

    this.opportunityForm=this.fb.group({
      recieveddate: ['', Validators.required],
      ClientSubmissionDate : ['', Validators.required],
      projectdesc:[""],
      otherobservation:[""],
      chance:new FormControl(this.Chances[0],Validators.required),
      delivery: new FormControl(this.Timeline[1], Validators.required),
      technology: new FormControl(this.Technology[3], Validators.required),
      competitors: [''],
      url:[''],
      learn:new FormControl(this.data[0],Validators.required),
      budgetrange:[''],
      currency: new FormControl(this.currencies[currencyindex])

    })


    // user links form validations
    // this.accountDetailsForm = this.fb.group({
    //   username: new FormControl('', Validators.compose([
    //    UsernameValidator.validUsername,
    //    Validators.maxLength(25),
    //    Validators.minLength(5),
    //    Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    //    Validators.required
    //   ])),
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   matching_passwords: this.matching_passwords_group,
    //   terms: new FormControl(false, Validators.pattern('true'))
    // })

    this.submissionDetailsForm=this.fb.group({
      proptype:new FormControl(this.proptypes[1], Validators.required),
      dueDate: ['', Validators.required],
    })

  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }



  onSubmitUserDetails(value){
    // console.log(value);
    this.userdetails=value;
  }
  onSubmitGeneralInfoDetails(value){
    this.generalinfo=value;
  }
  onSubmitOpportunityDetails(value){
    // console.log(value);
    this.opportunity=value;
  }
  onSubmitSubmissionDetails(value){
    // console.log(value);
    this.submissiondetails=value;
    this.FormSubmission();
  }
  FormSubmission(){

    this.db.collection(this.generalinfo.first_name+' '+this.generalinfo.last_name).doc('Opportunity '+this.id).collection('General-Info').add({
      first_name:this.generalinfo.first_name,
      last_name:this.generalinfo.last_name,
      country:this.generalinfo.country.name
    })

    this.db.collection(this.generalinfo.first_name+' '+this.generalinfo.last_name).doc('Opportunity '+this.id).collection('Client-Details').add({
      fullname:this.userdetails.fullname,
      appreviation:this.userdetails.appreviation,
      contactname:this.userdetails.name,
      contacttitle:this.userdetails.title,
      contactemail:this.userdetails.email,
      contactnumber:this.userdetails.number,
      previousprojectinfo:this.userdetails.bio,
      clienttype:this.userdetails.type,
      numberofemployees:this.userdetails.size,
      clientindustry:this.userdetails.industry
    })
    if(this.opportunity.budgetrange==''){
      this.opportunity.budgetrange='Not Specified';
      this.opportunity.currency='';
    }
    this.db.collection(this.generalinfo.first_name+' '+this.generalinfo.last_name).doc('Opportunity '+this.id).collection('Opportunity-Details').add({
      recieveddate: this.convert(this.opportunity.recieveddate),
      clientsubmissiondate: this.convert(this.opportunity.ClientSubmissionDate),
      projectdesc:this.opportunity.projectdesc,
      otherobservation:this.opportunity.otherobservation,
      deliverytimeline:this.opportunity.delivery,
      requiredtechnology:this.opportunity.technology,
      chanceofWinning:this.opportunity.chance,
      competitors:this.opportunity.competitors,
      learn:this.opportunity.learn,
      url:this.opportunity.url,
      budgetrange:this.opportunity.budgetrange+' '+this.opportunity.currency
    })
    this.db.collection(this.generalinfo.first_name+' '+this.generalinfo.last_name).doc('Opportunity '+this.id).collection('Submission-Details').add({
      proposaltype:this.submissiondetails.proptype,
      dueDate:this.convert(this.submissiondetails.dueDate)
    })
    this.db.collection(this.generalinfo.first_name+' '+this.generalinfo.last_name).doc('Opportunity '+this.id).set({
      nothing:'everteam'
    })
    this.db.collection(this.generalinfo.first_name+' '+this.generalinfo.last_name).doc('Opportunity '+this.id).collection('Uploads').get().toPromise().then(querySnapshot=> {
      querySnapshot.forEach(doc=> {
          // doc.data() is never undefined for query doc snapshots
          this.string+=doc.data().path+'<br />';
      });
      this.string+=this.opportunity.url;

      const bodybackup={
      first_name:this.generalinfo.first_name,
      last_name:this.generalinfo.last_name,
      country:this.generalinfo.country.name,
      clientname:this.userdetails.fullname,
      appreviation:this.userdetails.appreviation,
      contactname:this.userdetails.name,
      contacttitle:this.userdetails.title,
      contactemail:this.userdetails.email,
      contactnumber:this.userdetails.number,
      previousprojectinfo:this.userdetails.bio,
      clienttype:this.userdetails.type,
      numberofemployees:this.userdetails.size,
      clientindustry:this.userdetails.industry,
      recieveddate: this.convert(this.opportunity.recieveddate),
      clientsubmissiondate: this.convert(this.opportunity.ClientSubmissionDate),
      projectdesc:this.opportunity.projectdesc,
      otherobservation:this.opportunity.otherobservation,
      deliverytimeline:this.opportunity.delivery,
      requiredtechnology:this.opportunity.technology,
      chanceofWinning:this.opportunity.chance,
      competitors:this.opportunity.competitors,
      learn:this.opportunity.learn,
      urls:this.string,
      budgetrange:this.opportunity.budgetrange+' '+this.opportunity.currency,
      proposaltype:this.submissiondetails.proptype,
      dueDate:this.convert(this.submissiondetails.dueDate),
      id:this.id
      }

      const body={
        yahyaemail:"yahya.abihaidar98@gmail.com",
        mazenemail:"m.farah@everteam-gs.com",
        stephanieemail:"s.azarian@everteam-gs.com",
        first_name:this.generalinfo.first_name,
        last_name:this.generalinfo.last_name,
        country:this.generalinfo.country.name,
        appreviation:this.userdetails.appreviation,
        currentuseremail:this.globals.currentuser.email,
        clientname:this.userdetails.fullname,
        projectdesc:this.opportunity.projectdesc,
        clientsubmissiondate: this.convert(this.opportunity.ClientSubmissionDate),
        budgetrange:this.opportunity.budgetrange+' '+this.opportunity.currency,
        urls:this.string,
        id:this.id
      }
      if(this.generalinfo.country.name=='France'){
        this.sendMaillara(bodybackup).then((res) => {
          //  console.log(res);
         });
      }
      this.sendMailbackup(bodybackup).then((res) => {
        //  console.log(res);
       });
       this.sendMail(body).then((res) => {
        //  console.log(res);
       });
      // this.sendMailsales(body).then((res) => {
      //   // console.log(res);
      // });
      this.id++
      this.db.collection('idcounter').doc('Id Counter').set({
        id:this.id
      })

  });


    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully submitted',
      showConfirmButton: false,
      timer: 1500
    })

    setTimeout(() => {
      this.router.navigate(['']);
    }, 1500);


  }
  // toggleHover(event: boolean) {
  //   this.isHovering = event;
  // }
  selectionStepperChange(event){
    if(event.selectedIndex==1){
  this.onSubmitGeneralInfoDetails(this.generalinfoForm.value);

    }
    if(event.selectedIndex==2){
   this.onSubmitUserDetails(this.userDetailsForm.value);

    }
    if(event.selectedIndex==3){
    this.onSubmitOpportunityDetails(this.opportunityForm.value)
    }
  }




  // startUpload(event: FileList) {
  //   // The File object
  //   const file = event.item(0)

  //   // Client-side validation example
  //   if (file.type.split('/')[0] !== 'image') {
  //     console.error('unsupported file type :( ')
  //     return;
  //   }

  //   // The storage path
  //   const path = `test/${new Date().getTime()}_${file.name}`;

  //   // Totally optional metadata
  //   const customMetadata = { app: 'My AngularFire-powered PWA!' };

  //   // The main task
  //   this.task = this.storage.upload(path, file, { customMetadata })
  //   const ref = this.storage.ref(path);
  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();
  //   this.snapshot   = this.task.snapshotChanges()

  //   // The file's download URL
  //   this.task.snapshotChanges().pipe(
  //     finalize(() => {
  //      ref.getDownloadURL().subscribe(url => {
  //        console.log(url); // <-- do what ever you want with the url..
  //      });
  //    }))
  //    .subscribe();
  // }

  // Determines if the upload task is active
  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  // }

  // public clearEventHandler(): void {
  //   this.log('Clearing the file upload');
  //   this.imagePreviews = [];
  // }

  // public completeEventHandler() {
  //   this.log(`All files processed`);
  // }

  // public removeEventHandler(e: RemoveEvent): void {
  //   this.log(`Removing ${e.files[0].name}`);

  //   const index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

  //   if (index >= 0) {
  //     this.imagePreviews.splice(index, 1);
  //   }
  // }

  // public selectEventHandler(e: SelectEvent): void {
  //   const that = this;

  //   e.files.forEach((file) => {
  //     that.log(`File selected: ${file.name}`);

  //     if (!file.validationErrors) {
  //       const reader = new FileReader();

  //       reader.onload = function (ev) {
  //         const image = {
  //           src: ev.target['result'],
  //           uid: file.uid
  //         };

  //         that.imagePreviews.unshift(image);
  //       };

  //       reader.readAsDataURL(file.rawFile);
  //     }
  //   });
  // }

  // private log(event: string): void {
  //   this.events.unshift(`${event}`);
  // }

}
