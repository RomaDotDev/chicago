import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { EmployeeService } from './employee.service';

@Component({
  template:  `<router-outlet></router-outlet>`,
  directives: [ ROUTER_DIRECTIVES ],
  providers:  [ EmployeeService ]
})
export class EmployeeComponent {
    constructor(
        private employeeService: EmployeeService
    ){}
}
