import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
    templateUrl: 'app/employee/detail/employee-detail.html'
})

export class EmployeeDetailComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService
    ){}

    private paramsSubscription:Subscription;
    private employeeSubscription:Subscription;
    private employee:Employee;

    ngOnInit(){
        this.paramsSubscription = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.employeeSubscription = this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee);
         });
    }

    // clean up
    ngOnDestroy(){
        if (this.paramsSubscription){
            this.paramsSubscription.unsubscribe();
        }

        if (this.employeeSubscription){
            this.employeeSubscription.unsubscribe();
        }
    }

}
