import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { FilterByDepartmentPipe } from '../filterByDepartment.pipe';
import { SplitPipe } from '../split.pipe';

@Component({
  templateUrl: 'app/employee/list/employee-list.html',
  pipes: [ FilterByDepartmentPipe, SplitPipe ],
  styleUrls: [
      'app/employee/list/employee-list.css'
  ],
  directives: [ ROUTER_DIRECTIVES, SpinnerComponent ]
})

// TODO: empty data case
// TODO: error case

export class EmployeeListComponent implements OnInit, OnDestroy{

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private employeeService: EmployeeService
    ){}

    private perPage:number = 100;
    private pageNum:number = 1;
    private employeesSubscription:Subscription;
    private employees:Array<Employee> = [];
    private departments:Array<string>;
    private selectedDepartment:string = '';
    private perRageArr:Array<number> = [ 25, 50, 75, 100, 125, 150, 175, 200]

    ngOnInit(){
        this.getEmployees();
    }

    ngOnDestroy(){
        if (this.employeesSubscription){
            this.employeesSubscription.unsubscribe();
        }
    }

    private onClickPrevious(){
        this.pageNum--;
        this.getEmployees();
    }

    private onClickNext(){
        this.pageNum++;
        this.getEmployees();
    }

    private getEmployees(){
        if (this.employeesSubscription){
            this.employeesSubscription.unsubscribe();
        }

        this.employeesSubscription = this.employeeService.getEmployees(this.pageNum, this.perPage)
                    .subscribe(employees => {
// Data filtering is handled by client. All data manipulations are going within current data page.

// For usability reasons filter is dropped every time when page number or per page
// counter are changed
                        this.selectedDepartment = '';
                        this.employees = employees;
                        this.departments = this.getDepartments(this.employees);
                    });
    }


    // return unique departments based on records of current data page
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
