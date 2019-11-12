import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos Personales
import { AuthModule } from './components/auth/auth.modulo';
import { SharedModule } from './components/shared/shared.module';
import { IngresoEgresoModule } from './components/ingreso-egreso/ingreso-egreso.module';

// NgRx
import { StoreModule } from "@ngrx/store";
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// FireBase
import { AngularFireModule } from '@angular/fire';

// Enviroment
import { environment } from 'src/environments/environment.prod';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    IngresoEgresoModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
