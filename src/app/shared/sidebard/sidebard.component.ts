import { Component, OnInit } from '@angular/core';
import { SidebarService } from './../../services/sidebar.service';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styles: [
  ]
})
export class SidebardComponent implements OnInit {

  public menuItems: any[];

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    console.log('this.menuItems ', this.menuItems);
  }

}
