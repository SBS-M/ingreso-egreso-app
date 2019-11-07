import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  suscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {

    this.suscription = this.store.select('ui').subscribe((changeState) => {
      this.isLoading = changeState.isLoading;
    });

  }

  onSubmit(value){
    this.authService.crearUsuario(value.nombre, value.correo, value.password);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
