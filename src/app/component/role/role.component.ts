import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  private router = inject(Router);

  onClick() {
    this.router.navigate(['']);
  }
}
