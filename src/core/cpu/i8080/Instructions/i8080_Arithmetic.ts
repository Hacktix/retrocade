import i8080 from "../i8080";
import { PARITY_LOOKUP_TABLE, Register, RegisterPair } from "../i8080_InstructionEnums";

export function i8080_INX(this: i8080, target: RegisterPair) {
    this.regs[target]++;
    return 1;
}

export function i8080_DCR(this: i8080, target: Register) {
    if(target === Register.M) {
        const src = this.bus.read(this.regs.hl);
        const res = (src - 1) & 0xFF;
        this.bus.write(res, this.regs.hl);

        this.flags.z = res === 0;
        this.flags.s = (res & 0x80) !== 0;
        this.flags.p = PARITY_LOOKUP_TABLE[res];
        this.flags.ac = (src & 0xf) === 0xf;
        return 3;
    }
    else {
        const src = this.regs[target];
        const res = (src - 1) & 0xFF;
        this.regs[target] = res;

        this.flags.z = res === 0;
        this.flags.s = (res & 0x80) !== 0;
        this.flags.p = PARITY_LOOKUP_TABLE[res];
        this.flags.ac = (src & 0xf) === 0xf;
        return 1;
    }
}