import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { EmployeeService } from './employee.service';

@Component({
  template:  `<div class="dt-content-wrapper">
                <router-outlet></router-outlet>
            </div>`,
  styleUrls: ['app/employee/employee.css'],
  directives: [ ROUTER_DIRECTIVES ],
  providers:  [ EmployeeService ]
})
export class EmployeeComponent {
    constructor(
        private employeeService: EmployeeService
    ){}
}
