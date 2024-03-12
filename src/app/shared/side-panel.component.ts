import { NgClass } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div
      class="absolute w-96 bg-slate-800 text-white top-0 bottom-0  transition-all shadow-2xl p-3 duration-1000"
      style="z-index: 1000"
      [ngClass]="{
        'right-0': isOpen(),
        '-right-96': !isOpen()
     }"
    >

      <div class="flex gap-3 items-center justify-between">
        <div class="font-bold">{{title()}}</div>
        <i class="fa fa-times cursor-pointer" (click)="close.emit()"></i>
      </div>

    <ng-content></ng-content>
    </div>
  `,
  styles: ``
})
export class SidePanelComponent {
  title = input('SIDE PANEL')
  isOpen = input(false)
  @Output() close = new EventEmitter();

}
