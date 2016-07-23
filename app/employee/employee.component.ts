import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

@Component({
  template:  `
    <h2>Employees</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class EmployeeComponent { }
