import { Component, input, output } from '@angular/core';
import { ListItemComponent } from 'src/app/pages/list/list-item/list-item.component';
import { Task } from 'src/app/shared/interfaces/task.interface';

@Component({
  selector: 'app-list-item',
  template: '',
  standalone: true,
})
export class FakeListItemComponent implements ListItemComponent {
  complete = output<Task>();
  notComplete = output<Task>();
  task = input.required<Task>();

  onComplete(): void {}
  onMarkAsPending(): void {}
}
