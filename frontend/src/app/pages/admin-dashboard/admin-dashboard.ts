import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h1>Pannello Admin</h1>

    <h3>Utenti Registrati</h3>
    <table mat-table [dataSource]="users()" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let user"> {{user.id}} </td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let user"> {{user.email_address}} </td>
      </ng-container>

      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef> Ruolo </th>
        <td mat-cell *matCellDef="let user"> {{user.role}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['id', 'email', 'role']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['id', 'email', 'role'];"></tr>
    </table>
  `
})
export class AdminDashboardComponent {
  http = inject(HttpClient);
  users = signal<any[]>([]);

  constructor() {
    this.http.get<any[]>('http://localhost:3000/admin/users')
      .subscribe(data => this.users.set(data));
  }
}