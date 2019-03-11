import { Injectable } from '@angular/core';
import { Note } from './note';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS, FIND_TODO, SET_ACTIVE, EDIT_TODO } from './actions';

@Injectable({
  providedIn: 'root'
})
export class Store { }

const objData = {
  id: null,
  title: '',
  description: '',
  createdTime: ''
};
export interface IAppState {
  todos: [];
  active: {};

}
export const INITIAL_STATE: IAppState = {
  todos: (localStorage.getItem('notesArray') && localStorage.getItem('notesArray').length > 0) ? JSON.parse(localStorage.getItem('notesArray')) : [],
  active: {}
};

export function rootReducer(state: IAppState = INITIAL_STATE, action: any): any {
  let active;
  switch (action.type) {
    case ADD_TODO:
      action.todo.id = state.todos.length + 1;
      return Object.assign({}, state, {
        todos: state.todos.concat(Object.assign({}, action.todo))
      });
    case EDIT_TODO:
      const todoObj = state.todos.find(({ id }) => id === action.id);
      const indexObj = state.todos.indexOf(todoObj);
      console.log(state.todos[indexObj]);
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, indexObj),
          Object.assign({}, todoObj),
          ...state.todos.slice(indexObj + 1)
        ]
      });
    case TOGGLE_TODO:
      console.log(state);
      let todos: any = [...state.todos];
      const index = todos.findIndex(({ id }) => id === action.note.id);
      todos[index] = action.note;
      return Object.assign({}, state, { todos });

    case REMOVE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.filter(({ id }) => id !== action.id)
      });
    case FIND_TODO:
      active = state.todos.find(({ id }) => id === action.id);
      return Object.assign({}, state, {
        active
      });
    case SET_ACTIVE:
      active = state.todos.find(({ id }) => id === action.payload.id);
      console.log(active);
      return Object.assign({}, state, { active });

    case REMOVE_ALL_TODOS:
      return Object.assign({}, state, {
        todos: [],
        active: {}
      });
  }
  console.log(state.todos);
  return state;
}


