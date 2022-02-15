import MemoryBus from "../../base/MemoryBus";
import { DrawFunction } from "./SpaceInvadersEmu";

export default class SpaceInvadersBus extends MemoryBus {

    private rom: Uint8Array;
    private draw: DrawFunction;
    private render: Function;

    public constructor(rom: Uint8Array, draw: DrawFunction, render: Function) {
        super();
        this.rom = rom;
        this.draw = draw;
        this.render = render;
    }

    public read(addr: number): number {
        throw new Error("Method not implemented.");
    }

    public write(addr: number): void {
        throw new Error("Method not implemented.");
    }

}