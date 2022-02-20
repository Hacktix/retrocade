import i8080MemoryBus from "../../cpu/i8080/i8080_MemoryBus";

export default class i8080CPMBus extends i8080MemoryBus {

    private memory = Uint8Array.from(new Array(0x10000).fill(0));

    constructor(rom: Uint8Array) {
        super();

        // JMP F200
        this.memory[0] = 0xc3;
        this.memory[1] = 0x00;
        this.memory[2] = 0xf2;

        // JMP E400
        this.memory[5] = 0xc3;
        this.memory[6] = 0x00;
        this.memory[7] = 0xe4;

        for(let i = 0; i < rom.length; i++)
            this.memory[0x100 + i] = rom[i];
    }

    public readIO(port: number): number {
        throw new Error("Method not implemented.");
    }
    
    public writeIO(port: number, value: number): void {
        throw new Error("Method not implemented.");
    }

    public read(addr: number, size?: number): number {
        return this.memory[addr & 0xffff];
    }

    public write(value: number, addr: number, size?: number): void {
        this.memory[addr & 0xffff] = value;
    }

}