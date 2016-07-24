import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({ name: 'filterByDepartment' })
export class FilterByDepartmentPipe implements PipeTransform {
    transform(arr: Array<Employee>, departmentName: string) {
        if (departmentName === '') return arr;
        return arr.filter(function(employee:Employee){
            return (employee['department'].toLowerCase() === departmentName.toLowerCase())
        });
    }
}
