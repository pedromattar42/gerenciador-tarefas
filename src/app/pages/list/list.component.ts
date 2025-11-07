import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  tasks = signal<Task[]>([
    { title: 'Tarefa 1', isCompleted: false },
    { title: 'Tarefa 2', isCompleted: false },
    { title: 'Tarefa 3', isCompleted: false },
    { title: 'Tarefa 4', isCompleted: true },
    { title: 'Tarefa 5', isCompleted: true },
    { title: 'Tarefa 6', isCompleted: true },
  ])
  completedTasks = computed(() => this.tasks().filter((task) => task.isCompleted))
  pendingTasks = computed(() => this.tasks().filter((task) => !task.isCompleted))

}
