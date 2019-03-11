import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './store.service';
import { ADD_TODO, REMOVE_TODO, SET_ACTIVE, TOGGLE_TODO } from './actions';
import { Note } from './note';
import { NoteService } from './services/note.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @select() todos;
  @select() active$: any;
  activeNote: any;
  term: any;
  model: Note = {
    id: this.todos.length > 0 ? this.todos.length : 0,
    title: this.todos.length > 0 ? 'New Note ' + this.todos.length : 'New Note',
    description: this.todos.length > 0 ? 'New Note Description ' + this.todos.length : 'New Note Description',
    createdTime: new Date()
  };
  constructor(private ngRedux: NgRedux<IAppState>, private noteService: NoteService) { }

  ngOnInit() {

  }

  // onSubmit() {
  //   this.ngRedux.dispatch({type: ADD_TODO, todo: this.model});
  // }

  toggleTodo(todo) {
    //toggleTodo(textbox) {
    let obj = Object.assign({}, this.activeNote, todo);
    obj.createdTime = new Date();
    // console.log(this.activeNote)
    // console.log(obj)
    this.noteService.editNotes(obj);
    this.ngRedux.dispatch({ type: TOGGLE_TODO, note: obj });
  }
  addNote(obj) {
    console.log(obj);
  }
  setActive(id) {

    this.ngRedux.dispatch({
      type: SET_ACTIVE,
      payload: { id }
    });
    this.active$.subscribe(res => {
      this.activeNote = res;
      console.log(this.activeNote);
    });
  }
  removeTodo(todo) {
    this.ngRedux.dispatch({ type: REMOVE_TODO, id: todo.id });
  }

  onSubmit() {

    this.todos.subscribe((res) => {
      console.log(res);
      if (res.length > 0) {
        this.model = {
          id: res.length,
          title: res.length > 0 ? 'New Note ' + res.length : 'New Note',
          description: res.length > 0 ? 'New Note Description ' + res.length : 'New Note Description',
          createdTime: new Date()
        };
      }
    });

    this.noteService.addNotes(this.model);
    this.ngRedux.dispatch({ type: ADD_TODO, todo: this.model });

  }
}


