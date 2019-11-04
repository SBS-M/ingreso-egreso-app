import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'ingresoEgresoApp';

  constructor(
    private atuhService: AuthService
  ){}

  ngOnInit(): void {
    this.atuhService.initAuthListener();
  }
}
