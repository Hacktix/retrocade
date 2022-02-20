import i8080 from "./i8080";
import { BDOS_C_WRITE, BDOS_C_WRITESTR } from "./Instructions/i8080_CPM";

export class i8080BDOSLUT {
    public table: {[key: number]: (this: i8080) => void};

    constructor(cpu: i8080) {
        this.table = {
            2: BDOS_C_WRITE,
            9: BDOS_C_WRITESTR
        }
    }
}