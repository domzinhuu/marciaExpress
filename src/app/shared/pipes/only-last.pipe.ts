import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyLast'
})
export class OnlyLastPipe implements PipeTransform {

  transform(value: string, split: string = " "): string {
    if (value) {
      let splitValue = value.split(split)
      let returnValue = ""

      for (let i = 0; i < splitValue.length - 1; i++) {
        returnValue += splitValue[i].replace(/\w/g, "*") + " "
      }

      returnValue += splitValue[splitValue.length - 1]

      return returnValue
    }

    return ''
  }

}
