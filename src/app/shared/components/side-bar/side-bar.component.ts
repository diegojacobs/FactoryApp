import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUnitInstruction } from 'src/app/shop-floor/interfaces/instructions.interface';
import { IShopFloorService } from 'src/app/shop-floor/interfaces/shop-floor-service.interface';
import { IUnit } from 'src/app/shop-floor/interfaces/unit.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  public unit: IUnit | undefined;
  public instruction: IUnitInstruction | undefined;
  private _onDestroy$: Subject<void>;

  constructor(
    public router: Router,
    public shopFloorService: IShopFloorService
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

  public goToHomePage(): void {
    this.router.navigate(['']);
  }

  public goToShopFloorPage(): void {
    this.router.navigate(['shop-floor']);
  }

  public goToInstructionView(): void {
    if (this.unit) {
      this.router.navigate([`instruction/${this.unit.route}`]);
    }
  }

  public goToProductionView(): void {
    if (this.instruction) {
      this.router.navigate([`production/${this.instruction.id}`]);
    } else {
      this.router.navigate([`production/-`]);
    }
  }

  private listenToUnitChange(): void {
    this.shopFloorService.currentUnit
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (value: IUnit | undefined) => this.unit = value,
      });
  }

  private listenToInstructionChange(): void {
    this.shopFloorService.currentInstruction
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (value: IUnitInstruction | undefined) => this.instruction = value,
      });
  }
}
