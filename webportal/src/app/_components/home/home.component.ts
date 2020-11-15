import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../_models';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  users = null;

  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
      this.checkAndRoute();

  }
  ngOnInit(): void {
    this.checkAndRoute();
    this.accountService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users);
  }

  checkAndRoute() {
    this.user = this.accountService.userValue; 
    console.log(this.user);
    if(!this.user) {
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== id));
}

}
