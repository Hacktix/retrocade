import i8080 from "../i8080";
import { RegisterPair } from "../i8080_InstructionEnums";

export function i8080_LXI(this: i8080, target: RegisterPair) {
    this.regs[target] = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    return 3;
}