import CPU from "../../base/CPU";
import { i8080InstructionLUT } from "./i8080_InstructionLUT";

export default class i8080 extends CPU {

    private lut: i8080InstructionLUT = new i8080InstructionLUT(this);

    protected pc: number = 0;
    public cycles: number = 0;

    protected regs = {
        // Internal register values
        _a: 0,
        _b: 0,
        _c: 0,
        _d: 0,
        _e: 0,
        _h: 0,
        _l: 0,
        _sp: 0,
        
        // 8-bit Getters
        get a() { return this._a; },
        get b() { return this._b; },
        get c() { return this._c; },
        get d() { return this._d; },
        get e() { return this._e; },
        get h() { return this._h; },
        get l() { return this._l; },
    
        // 16-bit Getters
        get bc() { return (this._b << 8) | this._c; },
        get de() { return (this._d << 8) | this._e; },
        get hl() { return (this._h << 8) | this._l; },
        get sp() { return this._sp; },

        // 8-bit Setters
        set a(v) { this._a = v & 0xff },
        set b(v) { this._b = v & 0xff },
        set c(v) { this._c = v & 0xff },
        set d(v) { this._d = v & 0xff },
        set e(v) { this._e = v & 0xff },
        set h(v) { this._h = v & 0xff },
        set l(v) { this._l = v & 0xff },

        // 16-bit Setters
        set bc(v) {
            this._b = (v & 0xff00) >> 8;
            this._c = v & 0xff;
        },
        set de(v) {
            this._d = (v & 0xff00) >> 8;
            this._e = v & 0xff;
        },
        set hl(v) {
            this._h = (v & 0xff00) >> 8;
            this._l = v & 0xff;
        },
        set sp(v) { this._sp = v & 0xffff }
    }

    public tick(): void {
        const opcode = this.bus.read(this.pc++);
        try {
            this.cycles += this.lut.table[opcode].call(this);
        } catch(e: any) {
            if(e.stack.includes("TypeError")) {
                this.pc--;
                throw new Error(`EMULATOR ERROR: Encountered unknown opcode $${opcode.toString(16).padStart(2, "0")} @ PC=$${this.pc.toString(16).padStart(4, "0")}`);
            }
        }
    }
    
    public reset(addr: number): void {
        throw new Error("Method not implemented.");
    }
    
}