import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MainMenuComponent, FooterComponent],
  declarations: [MainMenuComponent, FooterComponent]
})
export class MenuModule { }
