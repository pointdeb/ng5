import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const UsersRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users'},
  { path: '', children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/:current_page', component: UsersComponent }
    ]
  }
];
