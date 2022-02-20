import i8080 from "../i8080";

export function BDOS_C_WRITE(this: i8080) {
    console.log(String.fromCharCode(this.regs.e));
}

export function BDOS_C_WRITESTR(this: i8080) {
    let str = "", chr = "", offset = 0;
    while((chr = String.fromCharCode(this.bus.read(this.regs.de + (offset++)))) !== "$")
        str += chr;
    console.log(str);
}