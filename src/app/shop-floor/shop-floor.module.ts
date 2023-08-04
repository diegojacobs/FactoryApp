import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopFloorComponent } from './components/shop-floor/shop-floor.component';
import { ShopFloorService } from './services/shop-floor.service';
import { IShopFloorService } from './interfaces/shop-floor-service.interface';
import { InstructionViewComponent } from './components/instruction-view/instruction-view.component';
import { ProductionViewComponent } from './components/production-view/production-view.component';



@NgModule({
  declarations: [
    ShopFloorComponent,
    InstructionViewComponent,
    ProductionViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShopFloorComponent,
    InstructionViewComponent,
    ProductionViewComponent
  ],
  providers: [
    {
      provide: IShopFloorService,
      useClass: ShopFloorService
    }
  ]
})
export class ShopFloorModule { }
