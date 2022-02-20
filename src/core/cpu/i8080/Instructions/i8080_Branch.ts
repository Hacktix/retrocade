import i8080 from "../i8080";
import { BranchCondition } from "../i8080_InstructionEnums";

export function i8080_JMP(this: i8080): number {
    const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc = addr;
    return 10;
}

export function i8080_Jcond(this: i8080, cond: BranchCondition): number {
    let matchCond = false;
    switch(cond) {
        case BranchCondition.NZ: matchCond = !this.flags.z; break;
        case BranchCondition.Z: matchCond = this.flags.z; break;
        case BranchCondition.NC: matchCond = !this.flags.cy; break;
        case BranchCondition.C: matchCond = this.flags.cy; break;
        case BranchCondition.PO: matchCond = !this.flags.p; break;
        case BranchCondition.PE: matchCond = this.flags.p; break;
        case BranchCondition.P: matchCond = !this.flags.s; break;
        case BranchCondition.M: matchCond = this.flags.s; break;
    }
    if(matchCond)
        this.pc = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    else
        this.pc += 2;
    return 10;
}

export function i8080_CALL(this: i8080): number {
    const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc += 2;
    if(this.emulateCPM && addr === 5)
        this.bdosCall();
    else {
        this.bus.write((this.pc & 0xff00) >> 8, --this.regs.sp);
        this.bus.write(this.pc & 0xff, --this.regs.sp);
        this.pc = addr;
    }
    return 17;
}

export function i8080_Ccond(this: i8080, cond: BranchCondition): number {
    let matchCond = false;
    switch(cond) {
        case BranchCondition.NZ: matchCond = !this.flags.z; break;
        case BranchCondition.Z: matchCond = this.flags.z; break;
        case BranchCondition.NC: matchCond = !this.flags.cy; break;
        case BranchCondition.C: matchCond = this.flags.cy; break;
        case BranchCondition.PO: matchCond = !this.flags.p; break;
        case BranchCondition.PE: matchCond = this.flags.p; break;
        case BranchCondition.P: matchCond = !this.flags.s; break;
        case BranchCondition.M: matchCond = this.flags.s; break;
    }
    if(matchCond) {
        const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
        this.pc += 2;
        this.bus.write((this.pc & 0xff00) >> 8, --this.regs.sp);
        this.bus.write(this.pc & 0xff, --this.regs.sp);
        this.pc = addr;
        return 17;
    }
    this.pc += 2;
    return 11;
}

export function i8080_RET(this: i8080): number {
    this.pc = this.bus.read(this.regs.sp) | (this.bus.read(this.regs.sp + 1) << 8);
    this.regs.sp += 2;
    return 10;
}

export function i8080_Rcond(this: i8080, cond: BranchCondition): number {
    let matchCond = false;
    switch(cond) {
        case BranchCondition.NZ: matchCond = !this.flags.z; break;
        case BranchCondition.Z: matchCond = this.flags.z; break;
        case BranchCondition.NC: matchCond = !this.flags.cy; break;
        case BranchCondition.C: matchCond = this.flags.cy; break;
        case BranchCondition.PO: matchCond = !this.flags.p; break;
        case BranchCondition.PE: matchCond = this.flags.p; break;
        case BranchCondition.P: matchCond = !this.flags.s; break;
        case BranchCondition.M: matchCond = this.flags.s; break;
    }
    if(matchCond) {
        this.pc = this.bus.read(this.regs.sp) | (this.bus.read(this.regs.sp + 1) << 8);
        this.regs.sp += 2;
        return 11;
    }
    return 5;
}

export function i8080_PCHL(this: i8080) {
    this.pc = this.regs.hl;
    return 5;
}