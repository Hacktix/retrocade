import MemoryBus from "./MemoryBus";

export default abstract class CPU {

    private bus!: MemoryBus;

    public connectToBus(bus: MemoryBus): void {
        this.bus = bus;
    }

    public abstract tick(): void;
    public abstract reset(addr: number): void;

}