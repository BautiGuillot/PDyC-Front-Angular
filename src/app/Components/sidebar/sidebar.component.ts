import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  private loginService = inject(LoginService);
  private router = inject(Router);

  userEmail: string | null = null;

  ngOnInit(): void {
    this.userEmail = this.loginService.getUserEmail();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
