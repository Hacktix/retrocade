import i8080 from "./i8080";
import { i8080_JMP } from "./Instructions/i8080_BranchGroup";

export const i8080InstructionLUT: {[key: number]: (this: i8080) => number}  = {
    0x00: () => 1,
    0xc3: i8080_JMP
}