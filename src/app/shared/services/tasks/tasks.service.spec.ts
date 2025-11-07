import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Task } from '../../interfaces/task.interface';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('TasksService', () => {
  let service: TasksService;
  let httpClientTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(TasksService);
    httpClientTesting = TestBed.inject(HttpTestingController);
  });

  it('getAll() deve retornar uma lista de tarefas', fakeAsync(() => {
    let result: Task[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    const request = httpClientTesting.expectOne('/api/tasks');
    const fakeTasks = [
      { title: 'Tarefa 1', isCompleted: false },
      { title: 'Tarefa 2', isCompleted: false },
      { title: 'Tarefa 3', isCompleted: false },
      { title: 'Tarefa 4', isCompleted: true },
      { title: 'Tarefa 5', isCompleted: true },
      { title: 'Tarefa 6', isCompleted: true },
    ];

    request.flush(fakeTasks);

    tick();

    expect(result).toEqual(fakeTasks);
  }));
});
