import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { FilterByDepartmentPipe } from '../filterByDepartment.pipe';
import { SplitPipe } from '../split.pipe';

@Component({
  templateUrl: 'app/employee/list/employee-list.html',
  pipes: [ FilterByDepartmentPipe, SplitPipe ],
  styleUrls: ['app/employee/list/employee-list.css']
})

// TODO: empty data case
// TODO: error case
// TODO: adaptive table markup

export class EmployeeListComponent implements OnInit, OnDestroy{

    constructor(
        private router: Router,
        private employeeService: EmployeeService
    ){}

    private employeesSubscription:Subscription;
    private employees:Array<Employee> = [];
    private departments:Array<string>;
    private selectedDepartment:string = '';

    ngOnInit(){
        this.employeesSubscription = this.employeeService.getEmployees()
                        .subscribe(employees => {
                            this.employees = employees;
                            this.departments = this.getDepartments(this.employees);
                        });
    }

    ngOnDestroy(){
        if (this.employeesSubscription){
            this.employeesSubscription.unsubscribe();
        }
    }

    // return unique departments
    getDepartments(arr:Array<Employee>){
        let result:Array<string> = [];
        let record:any;

        for (let i = 0, len = arr.length; i <= len - 1; i++){
            record = arr[i];
            if (result.indexOf(record.department) === -1){
                result.push(record.department);
            }
        }

        return result;
    }

}
