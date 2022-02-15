import MemoryBus from "../../base/MemoryBus";

export default class SpaceInvadersBus extends MemoryBus {

    public read(addr: number, size: number): number {
        throw new Error("Method not implemented.");
    }
    
    public write(addr: number, size: number): void {
        throw new Error("Method not implemented.");
    }

}