import i8080 from "../i8080";
import { RegisterPair } from "../i8080_InstructionEnums";

export function i8080_OUT(this: i8080): number {
    const port = this.bus.read(this.pc++);
    this.bus.writeIO(port, this.regs.a);
    return 3;
}

export function i8080_PUSH(this: i8080, src: RegisterPair): number {
    if(src === RegisterPair.SP) {
        // SP is actually PSW
        this.bus.write(this.regs.a, --this.regs.sp);
        const flagsVal =
            (this.flags.cy ? (1 << 0) : 0) |
            (this.flags.p  ? (1 << 2) : 0) |
            (this.flags.ac ? (1 << 4) : 0) |
            (this.flags.z  ? (1 << 6) : 0) |
            (this.flags.s  ? (1 << 7) : 0) |
            0b10;
        this.bus.write(flagsVal, --this.regs.sp);
    }
    else {
        const pushVal = this.regs[src];
        this.bus.write((pushVal & 0xff00) >> 8, --this.regs.sp);
        this.bus.write(pushVal & 0xff, --this.regs.sp);
    }
    return 3;
}

export function i8080_POP(this: i8080, target: RegisterPair) {
    if(target === RegisterPair.SP) {
        const flagsVal = this.bus.read(this.regs.sp);
        this.flags.cy = (flagsVal & (1 << 0)) !== 0;
        this.flags.p  = (flagsVal & (1 << 2)) !== 0;
        this.flags.ac = (flagsVal & (1 << 4)) !== 0;
        this.flags.z  = (flagsVal & (1 << 6)) !== 0;
        this.flags.s  = (flagsVal & (1 << 7)) !== 0;
        this.regs.a = this.bus.read(this.regs.sp + 1);
    }
    else {
        const popVal = this.bus.read(this.regs.sp) | (this.bus.read(this.regs.sp + 1) << 8);
        this.regs[target] = popVal;
    }
    this.regs.sp += 2;
    return 3;
}