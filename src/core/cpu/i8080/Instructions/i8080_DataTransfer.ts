import i8080 from "../i8080";
import { Register, RegisterPair } from "../i8080_InstructionEnums";

export function i8080_LXI(this: i8080, target: RegisterPair) {
    this.regs[target] = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc += 2;
    return 10;
}

export function i8080_MVI(this: i8080, target: Register) {
    if(target === Register.M) {
        const val = this.bus.read(this.pc++);
        this.bus.write(val, this.regs.hl);
        return 10;
    } else {
        this.regs[target] = this.bus.read(this.pc++);
        return 7;
    }
}

export function i8080_LDAX(this: i8080, src: RegisterPair) {
    this.regs.a = this.bus.read(this.regs[src]);
    return 7;
}

export function i8080_MOV(this: i8080, target: Register, src: Register) {
    if(src === Register.M) {
        // @ts-expect-error: If `src` is Register.M, then `target` cannot also be Register.M. Typescript doesn't know this and throws an error
        this.regs[target] = this.bus.read(this.regs.hl);
        return 7;
    }
    else if(target === Register.M) {
        this.bus.write(this.regs[src], this.regs.hl);
        return 7;
    }
    else {
        this.regs[target] = this.regs[src];
        return 5;
    }
}

export function i8080_XCHG(this: i8080) {
    const tmp = this.regs.hl;
    this.regs.hl = this.regs.de;
    this.regs.de = tmp;
    return 4;
}

export function i8080_LDA(this: i8080) {
    const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc += 2;
    this.regs.a = this.bus.read(addr);
    return 13;
}

export function i8080_STA(this: i8080) {
    const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc += 2;
    this.bus.write(this.regs.a, addr);
    return 13;
}

export function i8080_LHLD(this: i8080) {
    const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc += 2;
    this.regs.l = this.bus.read(addr);
    this.regs.h = this.bus.read(addr + 1);
    return 16;
}