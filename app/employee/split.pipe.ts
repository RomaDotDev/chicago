import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
    transform(name: string, separator:string, order:number) {
        let nameArr:Array<string> = name.split(separator);
        return nameArr[order];
    }
}
