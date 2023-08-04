import { ToastEvokeService } from "@costlydeveloper/ngx-awesome-popup";
import { IAlertService } from "../interfaces/alert-service.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlertService implements IAlertService {

  constructor(private toastEvokeService: ToastEvokeService) {}

  public fireSuccessAlert(title: string, message: string): void {
    this.toastEvokeService.success(title, message).subscribe();
  }

  public fireErrorAlert(title: string, message: string): void {
    this.toastEvokeService.danger(title, message).subscribe();
  }

  public fireWarningAlert(title: string, message: string): void {
    this.toastEvokeService.warning(title, message).subscribe();
  }
}