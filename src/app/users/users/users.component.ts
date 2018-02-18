import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public search: any = {};
  public user: User = {};
  protected users: any = [];
  protected links: any = [];
  protected loading: Boolean = false;
  protected params: any = {};
  protected error: String;
  constructor(private userSvc: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => this.params = params);
    this.route.params.subscribe(params => this.params = params);
    this.refresh();
  }

  has(source: string, str: string): Boolean {
    if (!source) {
      return false;
    }
    return source.search(str) !== -1;
  }

  showLoading () {
    this.error = undefined;
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  refresh (params: any = {}) {
    this.showLoading();
    this.user = {};
    if (this.search.keyword) {
      params['first_name'] = this.search.keyword;
      params['email'] = this.search.keyword;
    }
    for (const key in this.params) {
      if (this.params.hasOwnProperty(key)) {
        params[key] = this.params[key];
      }
    }

    this.userSvc.getAll(params).subscribe(result => {
      const res  = result as any;
      this.users = res.data;
      this.links = res.links;
      // console.log(this.users);
      this.hideLoading();
    });
  }

  add (data: NgForm) {
    this.showLoading();
    if (data.valid) {
      if (!this.user.user_id) {
        this.userSvc.add(data.value).subscribe(result => {
          this.refresh();
        }, err => {
          this.error = err.error;
          // console.error(this.error);
        });
      } else {
        this.userSvc.update(this.user).subscribe(result => {
          this.refresh();
        }, err => {
          this.error = err.error;
          // console.error(this.error);
        });
      }
    }
  }

  delete(data: User) {
    this.showLoading();
    if (data && confirm(`Would you like to delete ${data.first_name} ?`)) {
      this.userSvc.delete(data).subscribe(result => {
        this.refresh();
      }, err => {
        this.error = err.error;
        // console.error(this.error);
      });
    }
  }

  prepareUpdate (data: User) {
    if (this.user.user_id) {
      this.users.unshift(this.user);
    }
    this.user = data;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].user_id === data.user_id) {
        this.users.splice(i, 1);
      }
    }
  }

}
