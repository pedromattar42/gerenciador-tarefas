import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-items.component.html',
  styleUrl: './no-items.component.scss',
})
export class NoItemsComponent {}
