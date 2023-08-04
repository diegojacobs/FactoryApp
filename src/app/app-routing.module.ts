import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutesModule } from './home/home.routing.module';
import { ShopFloorRoutesModule } from './shop-floor/shop-floor.routing.module';

const routes: Routes = [
  ...ShopFloorRoutesModule,
  ...HomeRoutesModule,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
