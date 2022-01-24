import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { VerticalViewComponent } from './components/vertical-view/vertical-view.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [LoadingSpinnerComponent, VerticalViewComponent],
  exports: [LoadingSpinnerComponent, VerticalViewComponent]
})
export class SharedModule {}
