import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authState: any = null;
  constructor(
     private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  //// Email/Password Auth ////
  emailSignUp(email:string, password:string,username:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: username,
       })
       user.user.sendEmailVerification();
        this.authState = user
        return user;
      })
      .catch(error => console.log(error.message));
  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
       });
  }

  phoneLogin(credential: firebase.auth.AuthCredential) {
    return this.afAuth.auth.signInWithCredential(credential);
  }

  customToken(token: string) {
    return this.afAuth.auth.signInWithCustomToken(token);
  }

  // Sends email allowing user to reset password
  resetPassword(email: string): Promise<any> {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error.message,'err'))
  }

    //// Sign Out ////
  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
