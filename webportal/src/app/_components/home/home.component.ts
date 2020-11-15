import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
      this.checkAndRoute();
  }
  ngOnInit(): void {
    this.checkAndRoute();
  }

  checkAndRoute() {
    this.user = this.accountService.userValue; 
    console.log(this.user);
    if(!this.user) {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
  }

}
