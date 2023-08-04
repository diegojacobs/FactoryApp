export abstract class IAlertService {
  abstract fireSuccessAlert(title: string, message: string): void;
  abstract fireErrorAlert(title: string, message: string): void;
  abstract fireWarningAlert(title: string, message: string): void;
}