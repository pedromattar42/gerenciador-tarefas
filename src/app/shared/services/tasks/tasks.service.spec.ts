import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('getAll() deve retornar uma lista de tarefas', fakeAsync(() => {
    let result: any = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    tick();

    expect(result).toEqual([
      { title: 'Tarefa 1', isCompleted: false },
      { title: 'Tarefa 2', isCompleted: false },
      { title: 'Tarefa 3', isCompleted: false },
      { title: 'Tarefa 4', isCompleted: true },
      { title: 'Tarefa 5', isCompleted: true },
      { title: 'Tarefa 6', isCompleted: true },
    ]);
  }));
});
