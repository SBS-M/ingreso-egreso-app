import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuarioLogueado: User;
  userAuthSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

  private cargarUsuario(){
    this.userAuthSubscription = this.store.select('authUser')
    .pipe(
      filter(userAuth => userAuth != null)
    )
    .subscribe((userAuth) => {
      this.usuarioLogueado = userAuth.user;
    })
  }

}
