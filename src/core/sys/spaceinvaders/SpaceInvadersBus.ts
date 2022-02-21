import i8080MemoryBus from "../../cpu/i8080/i8080_MemoryBus";
import SpaceInvadersAudio from "./SpaceInvadersAudio";
import { DrawFunction, SCREEN_HEIGHT, SpaceInvadersInput } from "./SpaceInvadersEmu";
import SpaceInvadersShiftReg from "./SpaceInvadersShiftReg";

export default class SpaceInvadersBus extends i8080MemoryBus {

    private rom: Uint8Array;
    private ram: Uint8Array = Uint8Array.from(new Array(0x400).fill(0));
    private vram: Uint8Array = Uint8Array.from(new Array(0x1C00).fill(0));
    private shiftReg: SpaceInvadersShiftReg = new SpaceInvadersShiftReg();
    private audio: SpaceInvadersAudio;

    public input = {
        [SpaceInvadersInput.Left]: false,
        [SpaceInvadersInput.Right]: false,
        [SpaceInvadersInput.Fire]: false,
        [SpaceInvadersInput.Credit]: false,
        [SpaceInvadersInput.Start1P]: false,
        [SpaceInvadersInput.Start2P]: false,
        [SpaceInvadersInput.Tilt]: false
    }
    public optionsBitOverlay = 0;

    private draw: DrawFunction;

    public constructor(rom: Uint8Array, draw: DrawFunction, audio: SpaceInvadersAudio) {
        super();
        this.rom = rom;
        this.draw = draw;
        this.audio = audio;
    }

    public read(addr: number): number {
        if(addr < 0x2000)      return this.rom[addr];
        else if(addr < 0x2400) return this.ram[addr & 0x3FF];
        else if(addr < 0x4000) return this.vram[addr - 0x2400];
        else                   return this.ram[addr % this.ram.length];
    }

    public write(val: number, addr: number): void {
        if(addr < 0x2000)
            return;
        else if(addr < 0x2400)
            this.ram[addr & 0x3FF] = val;
        else if(addr < 0x4000) {
            this.vram[addr - 0x2400] = val;

            // Update framebuffer when VRAM writes occur
            const xBase = Math.floor((addr - 0x2400) / 0x20);
            const yBase = (SCREEN_HEIGHT-1) - 8*(addr & 0x1F);
            for(let i = 0; i < 8; i++) {
                const lit = (val & 1) !== 0;
                this.draw(xBase, yBase - i, lit);
                val >>= 1;
            }
        }
        else
            this.ram[addr % this.ram.length] = val;
    }
    
    public readIO(port: number): number {
        switch(port) {
            case 0:
                return 0b1110
                    | (this.input[SpaceInvadersInput.Fire]  ? (1 << 4) : 0)
                    | (this.input[SpaceInvadersInput.Left]  ? (1 << 5) : 0)
                    | (this.input[SpaceInvadersInput.Right] ? (1 << 6) : 0);
            case 1:
                return 0b1000
                    | (this.input[SpaceInvadersInput.Credit]  ? 1 : 0)
                    | (this.input[SpaceInvadersInput.Start2P] ? (1 << 1) : 0)
                    | (this.input[SpaceInvadersInput.Start1P] ? (1 << 2) : 0)
                    | (this.input[SpaceInvadersInput.Fire]    ? (1 << 4) : 0)
                    | (this.input[SpaceInvadersInput.Left]    ? (1 << 5) : 0)
                    | (this.input[SpaceInvadersInput.Right]   ? (1 << 6) : 0);
            case 2:
                return this.optionsBitOverlay
                    | (this.input[SpaceInvadersInput.Tilt]   ? (1 << 2) : 0)
                    | (this.input[SpaceInvadersInput.Fire]   ? (1 << 4) : 0)
                    | (this.input[SpaceInvadersInput.Left]   ? (1 << 5) : 0)
                    | (this.input[SpaceInvadersInput.Right]  ? (1 << 6) : 0);
            case 3:
                return this.shiftReg.read();
            default:
                return 0;
        }
    }
    
    public writeIO(port: number, value: number): void {
        switch(port) {
            case 2:
            case 4:
                this.shiftReg.write(port, value);
                break;
            case 3:
            case 5:
                this.audio.write(port, value);
                break;
        }
    }

}