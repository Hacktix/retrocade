import i8080 from "./i8080";
import { RegisterPair } from "./i8080_InstructionEnums";
import { i8080_JMP } from "./Instructions/i8080_Branch";
import { i8080_LXI } from "./Instructions/i8080_DataTransfer";

export class i8080InstructionLUT {
    public table: {[key: number]: (this: i8080) => number};

    constructor(cpu: i8080) {
        this.table = {
            0x00: () => 1,
            0x01: i8080_LXI.bind(cpu, RegisterPair.BC),
            0x11: i8080_LXI.bind(cpu, RegisterPair.DE),
            0x21: i8080_LXI.bind(cpu, RegisterPair.HL),
            0x31: i8080_LXI.bind(cpu, RegisterPair.SP),
            0xc3: i8080_JMP
        }
    }
}
