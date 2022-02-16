import i8080 from "../i8080";
import { Register, RegisterPair } from "../i8080_InstructionEnums";

export function i8080_LXI(this: i8080, target: RegisterPair) {
    this.regs[target] = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc += 2;
    return 3;
}

export function i8080_MVI(this: i8080, target: Register) {
    if(target === Register.M) {
        const val = this.bus.read(this.pc++);
        this.bus.write(val, this.regs.hl);
        return 3;
    } else {
        this.regs[target] = this.bus.read(this.pc++);
        return 2;
    }
}