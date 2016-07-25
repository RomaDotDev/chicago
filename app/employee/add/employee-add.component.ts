import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { EmployeeService } from '../employee.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Employee } from '../employee';

@Component({
    templateUrl: 'app/employee/add/employee-add.html',
    directives: [ NgClass, ROUTER_DIRECTIVES, SpinnerComponent ]
})

// TODO: check if ID is available
// TODO: do not allow negative numbers
// TODO: department dropdown
// TODO: success message

export class EmployeeAddComponent implements OnInit, OnDestroy {
    @ViewChild('addEmployeeForm') addEmployeeForm:any;

    constructor(private employeeService: EmployeeService){}

    private submitSubscription:Subscription;
    private isSubmitted:boolean;
    private isLoading:boolean;
    private formModel:Object;
    private response:Object;

    ngOnInit(){
        this.isLoading = false;
        this.isSubmitted = false;
        this.formModel = {};
        this.response = {};
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
            this.isLoading = true;
            this.submitSubscription = this.employeeService.addEmployee(this.mapFormData(this.formModel))
                .subscribe(result => {
                    this.isLoading = false;
                    this.response = result;
                });
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
