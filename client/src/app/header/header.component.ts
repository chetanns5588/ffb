import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '32%'
    });

    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  openSignup() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '32%'
    });

    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    console.debug("Scroll Event",event);
  }

}
