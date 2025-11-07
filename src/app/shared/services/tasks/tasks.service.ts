import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  getAll(): Observable<Task[]> {
    return of(
      [
        { title: 'Tarefa 1', isCompleted: false },
        { title: 'Tarefa 2', isCompleted: false },
        { title: 'Tarefa 3', isCompleted: false },
        { title: 'Tarefa 4', isCompleted: true },
        { title: 'Tarefa 5', isCompleted: true },
        { title: 'Tarefa 6', isCompleted: true },
      ]
    )
  }
}
