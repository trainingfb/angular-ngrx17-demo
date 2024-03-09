// features/demo-signals/components/todos.component.ts
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodosStore } from '../store/todos.store';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    JsonPipe
  ],
  template: `
    <input 
      type="text" #input 
      (keydown.enter)="store.add(input.value); input.value = ''"
      placeholder="write new todo..."
    >
    

    @if(!store.empty()) {
      <div>Done: {{store.doneTotal()}}</div>  
      <div>Undone: {{store.undoneTotal()}}</div>
    }
      
    @for (todo  of store.todos(); track todo.id) {
      <li class="flex items-center gap-3 my-4">
        <input 
          type="checkbox" [checked]="todo.done" 
          (change)="store.toggle(todo.id)"
          class="checkbox"
        >
        <span [style.text-decoration]="todo.done ? 'line-through' : 'none'">
            {{todo.title}}
        </span>
        <button (click)="store.remove(todo.id)">Delete</button>
      </li>
    } @empty {
      <div>No todos</div>
    }
    
    
    <pre>{{store.todos() | json}}</pre>
  `,
  providers: [ TodosStore ]
})
export default class TodosComponent {
  store = inject(TodosStore)
}
