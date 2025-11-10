import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FakeTasksService } from '@testing/mocks/fake-tasks.service';
import { of } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FakeListItemComponent } from '@testing/mocks/fake-list-item.component';
import { TestHelper } from '@testing/helpers/test-helper';
import { Task } from 'src/app/shared/interfaces/task.interface';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let tasksService: TasksService;
  let testHelper: TestHelper<ListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [{ provide: TasksService, useClass: FakeTasksService }],
    });

    TestBed.overrideComponent(ListComponent, {
      remove: {
        imports: [ListItemComponent],
      },
      add: {
        imports: [FakeListItemComponent],
      },
    });
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    testHelper = new TestHelper(fixture);

    tasksService = TestBed.inject(TasksService);
  });

  it('deve listar as tarefas', () => {
    (tasksService.getAll as jest.Mock).mockReturnValue(
      of([
        { title: 'Tarefa 1', isCompleted: false },
        { title: 'Tarefa 2', isCompleted: false },
        { title: 'Tarefa 3', isCompleted: false },
        { title: 'Tarefa 4', isCompleted: true },
        { title: 'Tarefa 5', isCompleted: true },
        { title: 'Tarefa 6', isCompleted: true },
      ])
    );

    fixture.detectChanges();

    const todoSection = fixture.debugElement.query(
      By.css('[data-testid="todo-list"]')
    );
    expect(todoSection).toBeTruthy();

    const todoItems = todoSection.queryAll(
      By.css('[data-testid="todo-list-item"]')
    );
    expect(todoItems.length).toBe(3);

    expect(todoItems[0].componentInstance.task()).toEqual({
      title: 'Tarefa 1',
      isCompleted: false,
    });
    expect(todoItems[1].componentInstance.task()).toEqual({
      title: 'Tarefa 2',
      isCompleted: false,
    });
    expect(todoItems[2].componentInstance.task()).toEqual({
      title: 'Tarefa 3',
      isCompleted: false,
    });

    const completedSection = fixture.debugElement.query(
      By.css('[data-testid="completed-list"]')
    );
    expect(completedSection).toBeTruthy();

    const completedItems = completedSection.queryAll(
      By.css('[data-testid="completed-list-item"]')
    );
    expect(completedItems.length).toBe(3);

    expect(completedItems[0].componentInstance.task()).toEqual({
      title: 'Tarefa 4',
      isCompleted: true,
    });
    expect(completedItems[1].componentInstance.task()).toEqual({
      title: 'Tarefa 5',
      isCompleted: true,
    });
    expect(completedItems[2].componentInstance.task()).toEqual({
      title: 'Tarefa 6',
      isCompleted: true,
    });
  });

  describe('quando a tarefa está pendente', () => {
    it('deve completar uma tarefa', () => {
      const fakeTask: Task = { id: '1', title: 'Tarefa 1', isCompleted: false };
      const fakeTasks = [fakeTask];

      (tasksService.getAll as jest.Mock).mockReturnValue(of(fakeTasks));

      const completedTask = { ...fakeTask, isCompleted: true };

      (tasksService.patch as jest.Mock).mockReturnValue(of(completedTask));
      
      fixture.detectChanges()

      expect(testHelper.queryByTestId('completed-list-item')).toBeNull();
      
      const todoItemDebugEl = testHelper.queryByTestId('todo-list-item');

      (todoItemDebugEl.componentInstance as FakeListItemComponent).complete.emit(fakeTask);
      
      expect(tasksService.patch).toHaveBeenCalledWith(fakeTask.id, { isCompleted: true });

      fixture.detectChanges();
      
      expect(testHelper.queryByTestId('completed-list-item')).toBeTruthy();

    });
  });
});
