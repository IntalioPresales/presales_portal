import { HttpClientModule } from '@angular/common/http';
import { AllDataViewComponent } from './all-data-view/all-data-view.component';
import { Globals } from './Globals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from './app.component';
// firebase imports, omit what you don't need for your app
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorage,AngularFireStorageModule } from '@angular/fire/storage';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UploadModule } from '@progress/kendo-angular-upload';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatInputModule,
  MatStepperModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSliderModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatGridListModule,
  MatExpansionModule,
  MatDialogModule,
  MatChipsModule,
  MatCardModule,
  MatButtonToggleModule,
  MatAutocompleteModule
 } from '@angular/material';

import { FormsComponent } from './forms/forms.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FileSizePipe } from './file-size.pipe';
import { EventLogComponent } from './event-log.component.ts';
import { LoginPageComponent } from './login-page/login-page.component';
import { DatePipe, CommonModule, CurrencyPipe } from '@angular/common';
import { ViewOpportunityComponent } from './view-opportunity/view-opportunity.component';
import { CdkTableModule } from '@angular/cdk/table';
import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { AuthGuard } from './auth.guard';
import { NavigatePresalesComponent } from './navigate-presales/navigate-presales.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PendingDataViewComponent } from './pending-data-view/pending-data-view.component';
import { HttpModule } from '@angular/http';
import { UploadService } from './uploads/shared/upload.service';
import { NavigationWonComponent } from './navigation-won/navigation-won.component';
import { Modal1Component } from './Modals/modal1/modal1.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './Modals/forgot-password/forgot-password.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigatecmComponent } from './navigatecm/navigatecm.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    EventLogComponent,
    FileSizePipe,
    AllDataViewComponent,
    Modal1Component,
    LoginPageComponent,
    ViewOpportunityComponent,
    NavigationPageComponent,
    NavigatePresalesComponent,
    PendingDataViewComponent,
    NavigationWonComponent,
    ForgotPasswordComponent,
    NavigatecmComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgZorroAntdModule,
    HttpClientModule,
    UploadModule,
    HttpModule,
    NgMultiSelectDropDownModule,
    SweetAlert2Module,
    NgbModule,
    MatTableExporterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AngularFirestore,Globals,DatePipe,AuthGuard,CurrencyPipe,SweetAlert2Module,NgbActiveModal,ToastrService,AngularFireStorage,UploadService,
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  entryComponents: [
    Modal1Component,
    ForgotPasswordComponent
  ]
})
export class AppModule { }
