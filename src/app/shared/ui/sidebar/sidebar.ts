import { Component, computed, inject } from '@angular/core';
import { CategoryFeatureService } from 'app/modules/category/services/category-feature.service';
import { SidebarService } from 'app/shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  categoryFeatureService = inject(CategoryFeatureService);
  sidebarService = inject(SidebarService);
  isOpen = computed(() => this.sidebarService.isOpen());

  onClose(): void {
    this.sidebarService.close();
  }

  onOverlayClick(): void {
    this.onClose();
  }
}
