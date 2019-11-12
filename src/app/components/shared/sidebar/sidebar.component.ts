import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/service/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuarioLogueado: User;
  userAuthSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private ingresoEgresoService: IngresoEgresoService,
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

  logOut(){
    this.authService.logOut();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
