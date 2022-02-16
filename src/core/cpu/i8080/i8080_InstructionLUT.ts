import i8080 from "./i8080";

export const i8080InstructionLUT: {[key: number]: (this: i8080) => number}  = {
    0x00: () => 1
}