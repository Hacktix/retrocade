export default abstract class MemoryBus {
    
    public abstract read(addr: number, size?: number): number;
    public abstract write(value: number, addr: number, size?: number): void;

}