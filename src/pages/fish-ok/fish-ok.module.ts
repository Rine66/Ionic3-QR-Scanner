import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FishOkPage } from './fish-ok';

@NgModule({
  declarations: [
    FishOkPage,
  ],
  imports: [
    IonicPageModule.forChild(FishOkPage),
  ],
})
export class FishOkPageModule {}
