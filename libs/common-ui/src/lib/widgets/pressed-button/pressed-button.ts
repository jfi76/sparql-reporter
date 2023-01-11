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
  selector: 'sparql-reporter-pressed-button',
  templateUrl: './pressed-button.html',
  styleUrls: ['./pressed-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PressedButtonComponent implements OnChanges {
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
