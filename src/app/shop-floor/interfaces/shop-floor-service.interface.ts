import { BehaviorSubject, Observable } from "rxjs";
import { IUnitInstruction, IUnitInstructionsList } from "./instructions.interface";
import { IStartIntructionResponse } from "./start-instruction.interface";
import { IStopIntructionResponse } from "./stop-instruction.interface";
import { IUnitList } from "./unit-list.interface";
import { IUnit } from "./unit.interface";

export abstract class IShopFloorService {
  abstract get currentUnit(): Observable<IUnit | undefined>;
  abstract get currentInstruction(): Observable<IUnitInstruction | undefined>;

  abstract set currentUnit(unit: IUnit);
  abstract set currentInstruction(instruction: IUnitInstruction);

  abstract getUnits(): Promise<IUnitList>;
  abstract getUnitInstructions(unitID: string): Promise<IUnitInstructionsList>;
  abstract startUnitInstruction(instruction: IUnitInstruction): Promise<IStartIntructionResponse>;
  abstract stopUnitInstruction(instruction: IUnitInstruction): Promise<IStopIntructionResponse>;
}