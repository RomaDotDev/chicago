import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
    transform(name: string, separator:string, order:number) {
        if (typeof name === 'undefined' || name === null) { return name}
        let nameArr:Array<string> = name.split(separator);
        return nameArr[order];
    }
}
