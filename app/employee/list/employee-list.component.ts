import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  templateUrl: '/app/employee/list/employee-list.html'
})

// TODO: empty data case
// TODO: error case
// TODO: name pipe
// TODO: department pipe
// TODO: sort by department
// TODO: adaptive table markup

export class EmployeeListComponent implements OnInit{

    constructor(
        private router: Router,
        private employeeService: EmployeeService
    ){}

    private employees:Array<Employee>;
    private departments:Array<string>;
    private selectedDepartment:string = 'All';

    ngOnInit(){
        this.employeeService.getEmployees()
                        .subscribe(employees => {
                            this.employees = employees;
                            this.departments = this.getDepartments(this.employees);
                        });
    }

    onDeptChange(value:string){
        console.log(value);
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
