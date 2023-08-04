import { Routes } from "@angular/router";
import { ShopFloorComponent } from "./components/shop-floor/shop-floor.component";
import { InstructionViewComponent } from "./components/instruction-view/instruction-view.component";
import { ProductionViewComponent } from "./components/production-view/production-view.component";

export const ShopFloorRoutesModule: Routes = [
  {
    path: 'shop-floor',
    component: ShopFloorComponent,
  },
  {
    path: 'instruction/:unitRoute',
    component: InstructionViewComponent
  },
  {
    path: 'production/:instructionID',
    component: ProductionViewComponent
  }
];