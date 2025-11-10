import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { NoItemsComponent } from './no-items/no-items.component';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NoItemsComponent, ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  taskService = inject(TasksService);
  tasks = signal<Task[]>([])
  completedTasks = computed(() => this.tasks().filter((task) => task.isCompleted))
  pendingTasks = computed(() => this.tasks().filter((task) => !task.isCompleted))

  ngOnInit() {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  onComplete(task: Task) {
    this.taskService.patch(task.id, { isCompleted: true }).subscribe((task) => {
      this.updateTask(task);
    });
  }

  private updateTask(task: Task) {
    this.tasks.update((tasks) => tasks.map((t) => t.id === task.id ? task : t))
  }
}
