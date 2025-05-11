import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'caps'
})
export class CapsPipe implements PipeTransform {

  transform(value: string, lowercase: boolean = true): string {
    value = String(value).trim();
    if (value && value != '') {
      let remainStr = String(value).slice(1);
      if (lowercase) remainStr = String(remainStr).toLowerCase()
      return String(value).charAt(0).toUpperCase() + remainStr;
    }
    return value;
  }

}

@Pipe({
  name: 'num_sequence'
})
export class NumSequence implements PipeTransform {

  transform(n: number) {
    return Array(n);
  }

}

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {

  transform(sortValue: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!Array.isArray(sortValue) || !field) {
      return sortValue;
    }

    if (order === 'asc') {
      sortValue.sort((a: any, b: any) => String(a[field]).localeCompare(b[field]));
    } else if (order === 'desc') {
      sortValue.sort((a: any, b: any) => String(b[field]).localeCompare(a[field]));
    }

    return sortValue;
  }
}