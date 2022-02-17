import i8080 from "../i8080";
import { PARITY_LOOKUP_TABLE, Register, RegisterPair } from "../i8080_InstructionEnums";

export function i8080_ADD(this: i8080, src: Register): number {
    const addVal = src === Register.M ? this.bus.read(this.regs.hl) : this.regs[src];
    this.flags.cy = (this.regs.a + addVal) > 0xff;
    this.flags.ac = (this.regs.a & 0xf) + (addVal & 0xf) > 0xf;
    this.regs.a += addVal;
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    return src === Register.M ? 7 : 4;
}

export function i8080_ADI(this: i8080): number {
    const addVal = this.bus.read(this.pc++);
    this.flags.cy = (this.regs.a + addVal) > 0xff;
    this.flags.ac = (this.regs.a & 0xf) + (addVal & 0xf) > 0xf;
    this.regs.a += addVal;
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    return 7;
}

export function i8080_SUB(this: i8080, src: Register): number {
    const subVal = src === Register.M ? this.bus.read(this.regs.hl) : this.regs[src];
    this.flags.cy = (this.regs.a - subVal) < 0;
    this.flags.ac = (this.regs.a & 0xf) - (subVal & 0xf) < 0;
    this.regs.a -= subVal;
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    return src === Register.M ? 7 : 4;
}

export function i8080_SUI(this: i8080): number {
    const subVal = this.bus.read(this.pc++);
    this.flags.cy = (this.regs.a - subVal) < 0;
    this.flags.ac = (this.regs.a & 0xf) - (subVal & 0xf) < 0;
    this.regs.a -= subVal;
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    return 7;
}

export function i8080_SBI(this: i8080): number {
    const subVal = this.bus.read(this.pc++) + (this.flags.cy ? 1 : 0);
    this.flags.cy = (this.regs.a - subVal) < 0;
    this.flags.ac = (this.regs.a & 0xf) - (subVal & 0xf) < 0;
    this.regs.a -= subVal;
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    return 7;
}

export function i8080_INR(this: i8080, target: Register): number {
    if(target === Register.M) {
        const incVal = (this.bus.read(this.regs.hl) + 1) & 0xff;
        this.bus.write(incVal, this.regs.hl);
        this.flags.z = incVal === 0;
        this.flags.s = (incVal & 0x80) !== 0;
        this.flags.p = PARITY_LOOKUP_TABLE[incVal];
        this.flags.ac = (incVal & 0xf) === 0;
        return 10;
    }
    else {
        this.regs[target]++;
        this.flags.z = this.regs[target] === 0;
        this.flags.s = (this.regs[target] & 0x80) !== 0;
        this.flags.p = PARITY_LOOKUP_TABLE[this.regs[target]];
        this.flags.ac = (this.regs[target] & 0xf) === 0;
        return 3;
    }
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
        return 10;
    }
    else {
        const src = this.regs[target];
        const res = (src - 1) & 0xFF;
        this.regs[target] = res;

        this.flags.z = res === 0;
        this.flags.s = (res & 0x80) !== 0;
        this.flags.p = PARITY_LOOKUP_TABLE[res];
        this.flags.ac = (src & 0xf) === 0xf;
        return 5;
    }
}

export function i8080_INX(this: i8080, target: RegisterPair) {
    this.regs[target]++;
    return 5;
}

export function i8080_DCX(this: i8080, target: RegisterPair) {
    this.regs[target]--;
    return 5;
}

export function i8080_DAD(this: i8080, src: RegisterPair) {
    this.flags.cy = (this.regs.hl + this.regs[src]) > 0xffff;
    this.regs.hl += this.regs[src];
    return 10;
}

export function i8080_DAA(this: i8080): number {
    if((this.regs.a & 0xf) > 9 || this.flags.ac) {
        this.flags.ac = (this.regs.a & 0xf) + 6 > 0xf;
        this.regs.a += 6;
    }
    if((this.regs.a & 0xf0) > (9 << 4) || this.flags.cy) {
        this.flags.cy = this.regs.a + (6 << 4) > 0xff;
        this.regs.a += (6 << 4);
    }
    this.flags.z = this.regs.a === 0;
    this.flags.s = (this.regs.a & 0x80) !== 0;
    this.flags.p = PARITY_LOOKUP_TABLE[this.regs.a];
    return 4;
}