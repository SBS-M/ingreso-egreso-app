import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  suscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.suscription = this.store.select('ui').subscribe((changeState) =>{
      this.isLoading = changeState.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  login(data: any){
    this.authService.login(data.email, data.password);
  }

}
