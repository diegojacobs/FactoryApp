import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUnit } from '../../interfaces/unit.interface';
import { IUnitInstruction } from '../../interfaces/instructions.interface';
import { IShopFloorService } from '../../interfaces/shop-floor-service.interface';
import { IAlertService } from 'src/app/shared/interfaces/alert-service.interface';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-view',
  templateUrl: './production-view.component.html',
  styleUrls: ['./production-view.component.scss']
})
export class ProductionViewComponent implements OnInit, OnDestroy {
  public unit: IUnit | undefined;
  public instruction: IUnitInstruction | undefined;
  private _onDestroy$: Subject<void>;
  constructor(
    public shopFloorService: IShopFloorService,
    public alertService: IAlertService,
    public router: Router
  ) {
    this._onDestroy$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._onDestroy$ = new Subject<void>();

    this.listenToUnitChange();
    this.listenToInstructionChange();
  }

  ngOnDestroy(): void {
    this._onDestroy$.complete();
    this._onDestroy$.unsubscribe();
  }
  

  public stopInstruction(): void {
    if (this.instruction) {
      this.shopFloorService.stopUnitInstruction(this.instruction)
        .then((response) => {
          this.alertService.fireSuccessAlert("Instruction stopped", `The instruction was stopped successfully.`);
        })
        .catch((reason) => {
          console.log("Error.", reason);
          this.alertService.fireErrorAlert("There was a problem.", "Please try again later");
        });
    }
  }

  public listenToUnitChange(): void {
    this.shopFloorService.currentUnit
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (value: IUnit | undefined) => {
          if (value) {
            this.unit = value;
          } else {
            this.router.navigate(['shop-floor']);
          }
        },
        error: (error: string) => this.alertService.fireErrorAlert("There was a problem.", "Try again later.")
      });
  }

  public listenToInstructionChange(): void {
    this.shopFloorService.currentInstruction
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (value: IUnitInstruction | undefined) => this.instruction = value,
        error: (error: string) => this.alertService.fireErrorAlert("There was a problem.", "Try again later.")
      });
  }
}
