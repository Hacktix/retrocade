import CPU from "../../base/CPU";
import { i8080InstructionLUT } from "./i8080_InstructionLUT";

export default class i8080 extends CPU {

    private pc: number = 0;
    private cycles: number = 0;

    public tick(): void {
        const opcode = this.bus.read(this.pc++);
        try {
            this.cycles += i8080InstructionLUT[opcode]();
        } catch(e: any) {
            if(e.stack.includes("TypeError")) {
                this.pc--;
                const msg = `EMULATOR ERROR: Encountered unknown opcode $${opcode.toString(16).padStart(2, "0")} @ PC=$${this.pc.toString(16).padStart(4, "0")}`;
                alert(msg);
                throw new Error(msg);
            }
        }
    }
    
    public reset(addr: number): void {
        throw new Error("Method not implemented.");
    }
    
}