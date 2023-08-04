import { Component, OnInit } from '@angular/core';
import { IShopFloorService } from '../../interfaces/shop-floor-service.interface';
import { IUnit } from '../../interfaces/unit.interface';
import { IUnitList } from '../../interfaces/unit-list.interface';
import { Router } from '@angular/router';
import { IAlertService } from 'src/app/shared/interfaces/alert-service.interface';

@Component({
  selector: 'app-shop-floor',
  templateUrl: './shop-floor.component.html',
  styleUrls: ['./shop-floor.component.scss']
})
export class ShopFloorComponent implements OnInit {
  public units: IUnit[];

  constructor(
    public alertService: IAlertService,
    public shopFloorService: IShopFloorService,
    public router: Router
  ) {
    this.units = [];
  }

  ngOnInit(): void {
    this.getUnits();
  }

  public unitClicked(unit: IUnit): void {
    this.shopFloorService.currentUnit = unit;
    this.router.navigate([`instruction/${unit.route}`]);
  }

  public getUnits(): void {
    this.shopFloorService.getUnits()
      .then((response: IUnitList) => {
        this.units = response.units;
      })
      .catch((reason) => {
        this.units = [];
        console.error("Error.", reason);
        this.alertService.fireErrorAlert('There was an error.', reason);
      });
  }
}
