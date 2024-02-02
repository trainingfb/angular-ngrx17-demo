// features/demo-signals/store/todo.store.ts
import { computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { interval } from 'rxjs';
import { Todo } from '../model/todo';

export type TodosState = {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: [
    { id: 1, title: 'todo A', done: true },
    { id: 2, title: 'todo B', done: false },
    { id: 3, title: 'todo C', done: true },
  ]
}

export const TodosStore = signalStore(
  withState(initialState),
  withComputed(({ todos }) => ({
    empty: computed(() => todos().length === 0),
    doneTotal: computed(() => todos().filter(t => t.done).length),
    undoneTotal: computed(() => todos().filter(t => !t.done).length),
  })),
  withMethods(({ todos, ...store }) => ({
    add(title: string) {
      const newTodo: Todo = {
        title,
        id: Date.now(),
        done: false
      }
      patchState(store, { todos: [...todos(), newTodo ] });
    },
    remove(id: number) {
      patchState(store, { todos: todos().filter(t => t.id !== id )});
    },
    toggle(id: number) {
      patchState(store, { todos: todos().map(t => t.id === id ? {...t, done: !t.done } : t )});
    },
  })),
  withHooks({
    onInit({ add }) {
      /*
      interval(2_000)
        .pipe(takeUntilDestroyed())
        .subscribe(() => add('new todo'));
                                   */
    },
    onDestroy({ todos }) {
      console.log('todos on destroy', todos());
    },
  }),
);
