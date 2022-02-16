import i8080 from "./i8080";
import { Register, RegisterPair } from "./i8080_InstructionEnums";
import { i8080_JMP } from "./Instructions/i8080_Branch";
import { i8080_LXI, i8080_MVI } from "./Instructions/i8080_DataTransfer";

export class i8080InstructionLUT {
    public table: {[key: number]: (this: i8080) => number};

    constructor(cpu: i8080) {
        this.table = {
            0x00: () => 1,
            0x01: i8080_LXI.bind(cpu, RegisterPair.BC),
            0x06: i8080_MVI.bind(cpu, Register.B),
            0x0e: i8080_MVI.bind(cpu, Register.C),
            0x11: i8080_LXI.bind(cpu, RegisterPair.DE),
            0x16: i8080_MVI.bind(cpu, Register.D),
            0x1e: i8080_MVI.bind(cpu, Register.E),
            0x21: i8080_LXI.bind(cpu, RegisterPair.HL),
            0x26: i8080_MVI.bind(cpu, Register.H),
            0x2e: i8080_MVI.bind(cpu, Register.L),
            0x31: i8080_LXI.bind(cpu, RegisterPair.SP),
            0x36: i8080_MVI.bind(cpu, Register.M),
            0x3e: i8080_MVI.bind(cpu, Register.A),
            0xc3: i8080_JMP
        }
    }
}
