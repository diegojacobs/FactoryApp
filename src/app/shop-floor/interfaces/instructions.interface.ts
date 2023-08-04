export interface IUnitInstruction {
  id: string;
  name: string;
  internalName: string;
}

export interface IUnitInstructionsList {
  data: IUnitInstruction[];
}