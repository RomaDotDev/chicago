import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
    templateUrl: 'app/employee/add/employee-add.html',
    directives: [ NgClass ]
})

// TODO: check if ID is available
// TODO: do not allow negative numbers
// TODO: department dropdown

export class EmployeeAddComponent implements OnInit, OnDestroy {
    @ViewChild('addEmployeeForm') addEmployeeForm:any;

    constructor(private employeeService: EmployeeService){}

    private submitSubscription:Subscription;
    private isSubmitted:boolean;
    private formModel:Object;

    ngOnInit(){
        this.isSubmitted = false;
        this.formModel = {};
    }

    ngOnDestroy(){
        if (this.submitSubscription){
            this.submitSubscription.unsubscribe();
        }
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.addEmployeeForm.form.valid){

            if (this.submitSubscription){
                this.submitSubscription.unsubscribe();
            }
            this.submitSubscription = this.employeeService.addEmployee(this.mapFormData(this.formModel))
                .subscribe(result => console.log(result));
        }
    }

    // normalize data for API format
    // uppercase values to match existing db representation
    private mapFormData(formObject:Object):Employee{
        return {
            'department': this.formModel['department'].toUpperCase(),
            'employee_annual_salary': this.formModel['salary'],
            'id': this.formModel['id'],
            'job_titles': this.formModel['title'].toUpperCase(),
            'name': `${this.formModel['firstName'].toUpperCase()} ${this.formModel['lastName'].toUpperCase()}`
        }
    }

}
