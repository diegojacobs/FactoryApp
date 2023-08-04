import { Component, OnDestroy, OnInit } from '@angular/core';
import { IShopFloorService } from '../../interfaces/shop-floor-service.interface';
import { IUnitInstruction, IUnitInstructionsList } from '../../interfaces/instructions.interface';
import { IUnit } from '../../interfaces/unit.interface';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IAlertService } from 'src/app/shared/interfaces/alert-service.interface';

@Component({
  selector: 'app-instruction-view',
  templateUrl: './instruction-view.component.html',
  styleUrls: ['./instruction-view.component.scss']
})
export class InstructionViewComponent implements OnInit, OnDestroy {
  public unit: IUnit | undefined;
  public unitInstructions: IUnitInstruction[] | undefined;

  private onDestroy$: Subject<void>;

  constructor(
    public alertService: IAlertService,
    public shopFloorService: IShopFloorService,
    public router: Router
  ) {
    this.onDestroy$ = new Subject<void>();
    this.unit = {
      "unitName": "Unit 1",
      "id": "7ba8c659-42da-451b-b266-ee986ca5deeb",
      "unitShortName": "u1",
      "route": "unit1"
    };

    this.getInstructions = this.getInstructions.bind(this);
  }

  ngOnInit(): void {
    this.onDestroy$ = new Subject<void>();
    this.listenToUnitChange();
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }


  public instructionClicked(instruction: IUnitInstruction): void {
    this.shopFloorService.startUnitInstruction(instruction)
      .then((response) => {
        this.alertService.fireSuccessAlert('Instruction Started!', 'The instruction was started succesfully.');
        this.router.navigate([`production/${instruction.id}`]);
      })
      .catch((reason: string) => {
        this.alertService.fireErrorAlert('There was an error!', reason);
      });
    
  }

  public listenToUnitChange(): void {
    this.shopFloorService.currentUnit.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: this.getInstructions,
      error: this.logError
    })
  }

  private getInstructions(unit: IUnit | undefined): void {
    if (unit) {
      this.shopFloorService.getUnitInstructions(unit.unitShortName)
      .then((response: IUnitInstructionsList) => {
        this.unitInstructions = response.data;
      })
      .catch((reason) => {
        this.unitInstructions = [];
        this.alertService.fireErrorAlert('There was an error.', 'Please try again later.');
        console.error("Error.", reason)
      });    
    } else {
      this.logError('There is no unit selected.')
    }
  }

  private logError(reason: string): void {
    this.alertService.fireErrorAlert('There was an error.', 'Please select a unit.');
    this.router.navigate(['shop-floor']);
    console.log('Error.', reason);
  }


}
