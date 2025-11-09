import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FakeTasksService } from '@testing/mocks/fake-tasks.service';
import { of } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FakeListItemComponent } from '@testing/mocks/fake-list-item.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: TasksService, useClass: FakeTasksService },
      ],
    })
    
    TestBed.overrideComponent(ListComponent, {
      remove: {
        imports: [ListItemComponent],
      },
      add: {
        imports: [FakeListItemComponent],
      },
    });
    await TestBed.compileComponents();

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

    expect(todoItems[0].componentInstance.task()).toEqual({ title: 'Tarefa 1', isCompleted: false });
    expect(todoItems[1].componentInstance.task()).toEqual({ title: 'Tarefa 2', isCompleted: false });
    expect(todoItems[2].componentInstance.task()).toEqual({ title: 'Tarefa 3', isCompleted: false });

    const completedSection = fixture.debugElement.query(By.css('[data-testid="completed-list"]'));
    expect(completedSection).toBeTruthy();

    const completedItems = completedSection.queryAll(By.css('[data-testid="completed-list-item"]'));
    expect(completedItems.length).toBe(3);

    expect(completedItems[0].componentInstance.task()).toEqual({ title: 'Tarefa 4', isCompleted: true });
    expect(completedItems[1].componentInstance.task()).toEqual({ title: 'Tarefa 5', isCompleted: true });
    expect(completedItems[2].componentInstance.task()).toEqual({ title: 'Tarefa 6', isCompleted: true });
  });
});
