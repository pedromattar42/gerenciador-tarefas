import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FakeTasksService } from '@testing/mocks/fake-tasks.service';
import { of } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: TasksService, useClass: FakeTasksService },
      ],
    }).compileComponents();

    tasksService = TestBed.inject(TasksService);
  });

  it('deve listar as tarefas', () => {
    (tasksService.getAll as jest.Mock).mockReturnValue(of([
      { title: 'Tarefa 1', isCompleted: false },
      { title: 'Tarefa 2', isCompleted: false },
      { title: 'Tarefa 3', isCompleted: false },
      { title: 'Tarefa 4', isCompleted: true },
      { title: 'Tarefa 5', isCompleted: true },
      { title: 'Tarefa 6', isCompleted: true },
    ]));

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const todoSection = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoSection).toBeTruthy();

    const todoItems = todoSection.queryAll(By.css('[data-testid="todo-list-item"]'));
    expect(todoItems.length).toBe(3);

    const completedSection = fixture.debugElement.query(By.css('[data-testid="completed-list"]'));
    expect(completedSection).toBeTruthy();

    const completedItems = completedSection.queryAll(By.css('[data-testid="completed-list-item"]'));
    expect(completedItems.length).toBe(3);
  });
});
