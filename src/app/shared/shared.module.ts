import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { IAlertService } from './interfaces/alert-service.interface';
import { AlertService } from './services/alert.service';



@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    NgxAwesomePopupModule.forRoot(),
    ToastNotificationConfigModule.forRoot()
  ],
  exports: [
    SideBarComponent
  ],
  providers: [
    {
      provide: IAlertService,
      useClass: AlertService
    }
  ]
})
export class SharedModule { }
