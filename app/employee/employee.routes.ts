import { RouterConfig } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './detail/employee-detail.component';
import { EmployeeListComponent }   from './list/employee-list.component';
import { EmployeeAddComponent } from './add/employee-add.component';

export const employeeRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/employee',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      {
        path: 'add',
        component: EmployeeAddComponent,
      },
      {
        path: ':id',
        component: EmployeeDetailComponent
      },
      {
        path: '',
        component: EmployeeListComponent
      }
    ]
  }
];
