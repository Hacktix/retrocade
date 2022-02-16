import i8080 from "../i8080";

export function i8080_JMP(this: i8080): number {
    const addr = this.bus.read(this.pc) | (this.bus.read(this.pc + 1) << 8);
    this.pc = addr;
    return 3;
}