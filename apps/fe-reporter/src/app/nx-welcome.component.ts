import { Component, ViewEncapsulation } from '@angular/core';

/* eslint-disable */

@Component({
  selector: 'sparql-reporter-nx-welcome',
  templateUrl: './table-basic.html',
  styles: [`:host {
    display: block;
    width: 100%;
    height: 100%;
  }`],
  // encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  countries=[{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},]
}
