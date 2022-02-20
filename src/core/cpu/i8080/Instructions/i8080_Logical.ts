import i8080 from "../i8080";
import { PARITY_LOOKUP_TABLE, Register } from "../i8080_InstructionEnums";

export function i8080_ANA(this: i8080, src: Register): number {
    if(src === Register.M)
        this.regs.a &= this.bus.read(this.regs.hl);
    else
        this.regs.a &= this.regs[src];
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    this.flags.cy = this.flags.ac = false;
    return src === Register.M ? 7 : 4;
}

export function i8080_ANI(this: i8080): number {
    this.regs.a &= this.bus.read(this.pc++);
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    this.flags.cy = this.flags.ac = false;
    return 7;
}

export function i8080_XRA(this: i8080, src: Register) {
    if(src === Register.M)
        this.regs.a ^= this.bus.read(this.regs.hl);
    else
        this.regs.a ^= this.regs[src];
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    this.flags.cy = this.flags.ac = false;
    return src === Register.M ? 7 : 4;
}

export function i8080_XRI(this: i8080): number {
    this.regs.a ^= this.bus.read(this.pc++);
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    this.flags.cy = this.flags.ac = false;
    return 7;
}

export function i8080_ORI(this: i8080): number {
    this.regs.a |= this.bus.read(this.pc++);
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    this.flags.cy = this.flags.ac = false;
    return 7;
}

export function i8080_ORA(this: i8080, src: Register): number {
    if(src === Register.M)
        this.regs.a |= this.bus.read(this.regs.hl);
    else
        this.regs.a |= this.regs[src];
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    this.flags.cy = this.flags.ac = false;
    return src === Register.M ? 7 : 4;
}

export function i8080_CMP(this: i8080, src: Register) {
    const cp = src === Register.M ? this.bus.read(this.regs.hl) : this.regs[src];
    const cpRes = (this.regs.a - cp) & 0xff;
    this.flags.z = cpRes === 0;
    this.flags.s = (cpRes & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[cpRes];
    this.flags.cy = this.regs.a < cp;
    this.flags.ac = (this.regs.a & 0xf) < (cp & 0xf);
    return src === Register.M ? 7 : 4;
}

export function i8080_CPI(this: i8080) {
    const cp = this.bus.read(this.pc++);
    const cpRes = (this.regs.a - cp) & 0xff;
    this.flags.z = cpRes === 0;
    this.flags.s = (cpRes & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[cpRes];
    this.flags.cy = this.regs.a < cp;
    this.flags.ac = (this.regs.a & 0xf) < (cp & 0xf);
    return 7;
}

export function i8080_RLC(this: i8080): number {
    this.flags.cy = (this.regs.a & 0x80) !== 0;
    this.regs.a = (this.regs.a << 1) | (this.flags.cy ? 1 : 0);
    return 4;
}

export function i8080_RRC(this: i8080): number {
    this.flags.cy = (this.regs.a & 1) === 1;
    this.regs.a = (this.regs.a >> 1) | (this.flags.cy ? (1 << 7) : 0);
    return 4;
}

export function i8080_RAL(this: i8080): number {
    const setCarry = (this.regs.a & 0x80) === 0x80;
    this.regs.a = (this.regs.a << 1) | (this.flags.cy ? 1 : 0);
    this.flags.cy = setCarry;
    return 4;
}

export function i8080_RAR(this: i8080): number {
    const setCarry = (this.regs.a & 1) === 1;
    this.regs.a = (this.regs.a >> 1) | (this.flags.cy ? 0x80 : 0);
    this.flags.cy = setCarry;
    return 4;
}

export function i8080_CMA(this: i8080) {
    this.regs.a = (~this.regs.a);
    return 4;
}

export function i8080_CMC(this: i8080) {
    this.flags.cy = !this.flags.cy;
    return 4;
}

export function i8080_STC(this: i8080) {
    this.flags.cy = true;
    return 4;
}