export default abstract class MemoryBus {
    
    public abstract read(addr: number, size: number): number;
    public abstract write(addr: number, size: number): void;

}