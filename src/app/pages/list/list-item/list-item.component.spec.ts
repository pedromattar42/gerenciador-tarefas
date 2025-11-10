import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';
import { Component } from '@angular/core';

async function setup(fakeTask: Task) {
  @Component({
    standalone: true,
    imports: [ListItemComponent],
    template: `<app-list-item
      [task]="task"
      (complete)="onCompleteTask($event)"
      (notComplete)="onNotComplete($event)"
    >
    </app-list-item>`,
  })
  class HostComponent {
    task = fakeTask;

    onCompleteTask() {}
    onNotComplete() {}
  }
  await TestBed.configureTestingModule({
    imports: [HostComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(HostComponent);
  const testHelper = new TestHelper(fixture);

  return { fixture, testHelper };
}

describe('ListItemComponent', () => {
  // let fixture: ComponentFixture<ListItemComponent>;
  // let testHelper: TestHelper<ListItemComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ListItemComponent],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(ListItemComponent);
  //   testHelper = new TestHelper(fixture);
  // });

  it('deve renderizar o título da tarefa', async () => {
    const fakeTask: Task = {
      id: '1',
      title: 'Nome da tarefa',
      isCompleted: false,
    };

    const { fixture, testHelper } = await setup(fakeTask);

    fixture.detectChanges();

    const text = testHelper.getTextContentByTestId('list-item-task-title');

    expect(text).toBe(fakeTask.title);
  });

  describe('quando a tarefa não estiver concluída', () => {
    it('deve renderizar o botão de concluir tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da tarefa',
        isCompleted: false,
      };
  
      const { fixture, testHelper } = await setup(fakeTask);
  
      fixture.detectChanges();
  
      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-complete-action'
      );
  
      expect(completeBtnDebugEl).toBeTruthy();

      const markAsPendingBtnDebugEl = testHelper.queryByTestId(
        'list-item-mark-as-pending-action'
      );

      expect(markAsPendingBtnDebugEl).toBeNull();
    });
    it('deve emitir um evento ao completar a tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da tarefa',
        isCompleted: false,
      };
  
      const { fixture, testHelper } = await setup(fakeTask);
  
      const onCompleteTaskSpy = jest.spyOn(
        fixture.componentInstance,
        'onCompleteTask'
      );
  
      fixture.detectChanges();
  
      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-complete-action'
      );
      completeBtnDebugEl.triggerEventHandler('click', null);
  
      expect(onCompleteTaskSpy).toHaveBeenCalled();
    });

  })

  describe('quando a tarefa estiver concluída', () => {
    it('deve renderizar o botão de marcar como pendente', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da tarefa',
        isCompleted: true,
      };
  
      const { fixture, testHelper } = await setup(fakeTask);
  
      fixture.detectChanges();
  
      const markAsPendingBtnDebugEl = testHelper.queryByTestId(
        'list-item-mark-as-pending-action'
      );
  
      expect(markAsPendingBtnDebugEl).toBeTruthy();

      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-complete-action'
      );

      expect(completeBtnDebugEl).toBeNull();
    });
    it('deve emitir um evento que marque a tarefa como pendente', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da tarefa',
        isCompleted: true,
      };
  
      const { fixture, testHelper } = await setup(fakeTask);
  
      const onMarkAsPendingSpy = jest.spyOn(
        fixture.componentInstance,
        'onNotComplete'
      );
  
      fixture.detectChanges();
  
      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-mark-as-pending-action'
      );
      completeBtnDebugEl.triggerEventHandler('click', null);
  
      expect(onMarkAsPendingSpy).toHaveBeenCalled();
    });
  })



});
