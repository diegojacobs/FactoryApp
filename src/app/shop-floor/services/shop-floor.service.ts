import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUnitList } from '../interfaces/unit-list.interface';
import { IShopFloorService } from '../interfaces/shop-floor-service.interface';
import { IUnitInstruction, IUnitInstructionsList } from '../interfaces/instructions.interface';
import { IStartIntructionResponse } from '../interfaces/start-instruction.interface';
import { IStopIntructionResponse } from '../interfaces/stop-instruction.interface';
import { IUnit } from '../interfaces/unit.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopFloorService implements IShopFloorService {
  private _currentUnit$: BehaviorSubject<IUnit | undefined>;
  private _currentInstruction$: BehaviorSubject<IUnitInstruction | undefined>;

  constructor() {
    this._currentUnit$ = new BehaviorSubject<IUnit | undefined>(undefined);
    this._currentInstruction$ = new BehaviorSubject<IUnitInstruction | undefined>(undefined);
  }

  public get currentUnit(): Observable<IUnit | undefined> {
      return this._currentUnit$.asObservable();
  }

  public get currentInstruction(): Observable<IUnitInstruction | undefined> {
    return this._currentInstruction$.asObservable();
  }

  public set currentUnit(unit: IUnit) {
    this._currentUnit$.next(unit);
  }

  public set currentInstruction(instruction: IUnitInstruction) {
    this._currentInstruction$.next(instruction);
  }

  getUnits(): Promise<IUnitList> {
    return Promise.resolve({
      "units": [{
          "unitName": "Unit 1",
          "id": "7ba8c659-42da-451b-b266-ee986ca5deeb",
          "unitShortName": "u1",
          "route": "unit1"
        },
        {
          "unitName": "Unit 2",
          "id": "8ba8c659-44da-451b-b265-ee986ca5deeb",
          "unitShortName": "u2",
          "route": "unit2"
        },
        {
          "unitName": "Unit ",
          "id": "9ba8c659-44da-498b-b265-ee986ca5abnf",
          "unitShortName": "u3",
          "route": "unit3"
        }
      ]
    });

  }

  public getUnitInstructions(unitShortName: string): Promise<IUnitInstructionsList> {
    //UNIT 1
    if (unitShortName === 'u1') {
      return Promise.resolve({
        "data": [{
            "id": "6a42926d-1649-426e-9692-a98732f1e36b",
                  "name": "Instruction 4526",
                  "internalName": "I4526"
          },
          {
            "id": "1d8d90b8-5d03-46b5-8abd-01549ad32826",
                  "name": "Instruction 9568",
                  "internalName": "I9568"
          }
        ]
      });
    }

    //UNIT 2
    if (unitShortName === 'u2') {
      return Promise.resolve({
        "data": [{
            "id": "c726ee89-ec19-487c-ab39-a38fe187bbb7",
                  "name": "Instruction 8995",
                  "internalName": "I8995"
          },
          {
            "id": "8cf73866-8d46-4199-8f88-1f9d47697865",
                  "name": "Instruction 4783",
                  "internalName": "I4783"
          }
        ]
      });
    }

    //UNIT 3
    if (unitShortName === 'u3') {
      return Promise.resolve({
        "data": [{
            "id": "2a213703-34d2-45b5-9550-3779d505c653",
                  "name": "Instruction 3356",
                  "internalName": "I3356"
          },
          {
            "id": "7ddde0fa-2817-494f-89b9-935a0f24e9f7",
                  "name": "Instruction 1122",
                  "internalName": "I1122"
          }
        ]
      });
    }

    return Promise.reject("There was an error. Try again later.")
  }
  public startUnitInstruction(instruction: IUnitInstruction): Promise<IStartIntructionResponse> {
    this.currentInstruction = instruction;
    return Promise.resolve({ data: { success: true }});
  }

  public stopUnitInstruction(instruction: IUnitInstruction): Promise<IStopIntructionResponse> {
    this._currentInstruction$.next(undefined);
    return Promise.resolve({ data: { success: true }});
  }
}
