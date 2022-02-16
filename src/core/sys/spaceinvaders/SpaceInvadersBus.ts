import MemoryBus from "../../base/MemoryBus";
import { DrawFunction, SCREEN_HEIGHT } from "./SpaceInvadersEmu";

export default class SpaceInvadersBus extends MemoryBus {

    private rom: Uint8Array;
    private ram: Uint8Array = Uint8Array.from(new Array(0x400).fill(0));
    private vram: Uint8Array = Uint8Array.from(new Array(0x1C00).fill(0));

    private draw: DrawFunction;

    public constructor(rom: Uint8Array, draw: DrawFunction) {
        super();
        this.rom = rom;
        this.draw = draw;
    }

    public read(addr: number): number {
        if(addr < 0x2000)      return this.rom[addr];
        else if(addr < 0x2400) return this.ram[addr & 0x3FF];
        else if(addr < 0x4000) return this.vram[addr - 0x2400];
        else                   return this.ram[addr % this.ram.length];
    }

    public write(val: number, addr: number): void {
        if(addr < 0x2000)
            this.rom[addr] = val;
        else if(addr < 0x2400)
            this.ram[addr & 0x3FF] = val;
        else if(addr < 0x4000) {
            this.vram[addr - 0x2400] = val;

            // Update framebuffer when VRAM writes occur
            const xBase = Math.floor((addr - 0x2400) / 0x20);
            const yBase = (SCREEN_HEIGHT-1) - 8*(addr & 0x1F);
            for(let i = 0; i < 8; i++) {
                const lit = (val & 0x80) > 0;
                this.draw(xBase, yBase - i, lit);
                val <<= 1;
            }
        }
        else
            this.ram[addr % this.ram.length] = val;
    }

}