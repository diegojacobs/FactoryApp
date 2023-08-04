import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

export const HomeRoutesModule: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { 
    path: '**',
    redirectTo: '',
  },
];