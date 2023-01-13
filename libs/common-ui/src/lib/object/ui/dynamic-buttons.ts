import { parseHostBindings } from '@angular/compiler';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { last, Observable, Subject } from 'rxjs';

@Component({
  selector: 'sparql-reporter-dynamic-buttons',
  templateUrl: './dynamic-buttons.html',
  styleUrls: ['./dynamic-buttons.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicButtonsComponent implements OnChanges {
  @Input()
  name = '';
  @Input()
  buttonDisabled? = false;
  @Output()
  emitName$ = new EventEmitter();

  @Input()
  @HostBinding('class.active')
  isActive?=false;

  ngOnChanges({ name }: SimpleChanges) {
    if (name) {
      console.log('get' + this.name);
    }
  }
  clickHandler() {
    this.emitName$.emit(this.name);
  }
}
