import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router:Router,
        public afAuth:AngularFireAuth,
        public flashMessagesService:FlashMessagesService
    ){}

    canActivate(): Observable<boolean>{
        return this.afAuth.authState.map(auth => {
            if(!auth)
            {
                this.router.navigate(['/']);
                this.flashMessagesService.show("Log In to access the service",{cssClass: 'custom-danger-alert' , timeout:4000});
                return false;
            } else{
                return true;
            }
        });
    }
}