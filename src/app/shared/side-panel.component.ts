// TAILWIND BASED
// side-panel.component.ts
import { NgClass } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div
      class="absolute w-96 bg-slate-800 top-0 bottom-0  transition-all shadow-2xl p-3"
      style="z-index: 1000"
      [ngClass]="{
        'right-0': opened(),
        '-right-96': !opened()
     }"
    >
      
      <div class="flex gap-3 items-center justify-between">
        <div class="font-bold">{{title()}}</div>
        <i class="fa fa-times cursor-pointer" (click)="toggle()"></i>
      </div>

    {{opened()}}
    </div>
  `,
  styles: ``
})
export class SidePanelComponent {
  title = input('SIDE PANEL')
  opened = model(false)

  toggle() {
    this.opened.update(v => !v)
  }
}
