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
    const fakeTasks: Task[] = [
      { id: '1', title: 'Tarefa 1', isCompleted: false },
      { id: '2', title: 'Tarefa 2', isCompleted: false },
      { id: '3', title: 'Tarefa 3', isCompleted: false },
      { id: '4', title: 'Tarefa 4', isCompleted: true },
      { id: '5', title: 'Tarefa 5', isCompleted: true },
      { id: '6', title: 'Tarefa 6', isCompleted: true },
    ];

    request.flush(fakeTasks);

    tick();

    expect(result).toEqual(fakeTasks);
  }));

  it('patch() deve atualizar uma tarefa', fakeAsync(() => {
    const fakeTask: Task = { id: '1', title: 'Tarefa 1', isCompleted: false };
    let result: Task | null = null;

    service.patch(fakeTask.id, { isCompleted: true }).subscribe((response) => {
      result = response;
    });

    const request = httpClientTesting.expectOne((req) => req.method === 'PATCH' && req.url === '/api/tasks/1');

    const fakeResponse = { ...fakeTask, isCompleted: true };

    request.flush(fakeResponse);

    tick();

    expect(result).toEqual(fakeResponse);
  }))
});
