import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(value: unknown) {
      if (value === undefined || value === null) {
        return value
      }
      if(!Array.isArray(value)) {
        throw new Error('| sort may only be used with arrays.')
      }

      return value.sort((a: string, b: string) =>  this._compareStrings(a,b) )
    }


  private _compareStrings(a: string, b: string) {
    a = a.toLowerCase()
		  a = a.replace(/ä/g, "a")
		  a = a.replace(/ö/g, "o")
		  a = a.replace(/ü/g, "u")
		  a = a.replace(/ß/g, "s")

		  b = b.toLowerCase()
		  b = b.replace(/ä/g, "a")
		  b = b.replace(/ö/g, "o")
		  b = b.replace(/ü/g, "u")
		  b = b.replace(/ß/g, "s")

		  return (a == b) ? 0 : (a > b ) ? 1 : -1
	  }
}
