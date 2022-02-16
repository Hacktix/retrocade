import MemoryBus from "../../base/MemoryBus";

export default abstract class i8080MemoryBus extends MemoryBus {
    
    public abstract readIO(port: number): number;
    public abstract writeIO(port: number, value: number): void;

}