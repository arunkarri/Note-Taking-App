import { Observable } from 'rxjs';
import {Note} from '../note'

// import 'rxjs/add/operator/toPromise';

export class NoteService {
  getNotes() {
    return new Promise((resolve) => { setTimeout(() => {
    resolve(JSON.parse(localStorage.getItem('notesArray')));
  }, 1000);
});
  }
  addNotes(obj): Observable<any> {
    let item = [];
    if ( localStorage.getItem('notesArray')) {
      item = JSON.parse(localStorage.getItem('notesArray'));
      item.push(obj);
      localStorage.setItem('notesArray', JSON.stringify(item));
    }
    else {
      item.push(obj);
      localStorage.setItem('notesArray', JSON.stringify(item));
    }
    console.log(localStorage);
    return (obj);
 
  }
  deleteNotes(id) {
    return new Promise(resolve => { setTimeout(() => {
    if ( localStorage.getItem('notesArray')) {
      const item = JSON.parse(localStorage.getItem('notesArray'));
      const obj =  item.filter(val => val.id !== id);
      localStorage.setItem('notesArray', JSON.stringify(item));
    }
    console.log(localStorage);
    resolve(id);
  }, 1000);
});
  }
 
  editNotes(obj) {
    return new Promise(resolve => { setTimeout(() => {
      if ( localStorage.getItem('notesArray')) {
        const item = JSON.parse(localStorage.getItem('notesArray'));
        const index =  item.findIndex(({id}) => id === obj.id);
        item[index] = obj;
        localStorage.setItem('notesArray', JSON.stringify(item));
      }
      console.log(localStorage);
      resolve(obj);
    }, 1000);
  });
  }

}

