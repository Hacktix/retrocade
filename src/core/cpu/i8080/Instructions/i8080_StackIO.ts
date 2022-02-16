import i8080 from "../i8080";
import { RegisterPair } from "../i8080_InstructionEnums";

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