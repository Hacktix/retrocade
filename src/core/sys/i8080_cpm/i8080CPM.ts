import i8080 from "../../cpu/i8080/i8080";
import i8080CPMBus from "./i8080CPMBus";

export const CYCLES_PER_FRAME = (2 * Math.pow(2, 20)) / 60;

export default class i8080CPMEmu {

    private bus: i8080CPMBus;
    private cpu: i8080;

    public constructor(rom: Uint8Array) {
        // Initialize hardware
        this.cpu = new i8080(true);
        this.bus = new i8080CPMBus(rom);
        this.cpu.connectToBus(this.bus);

        // Start Emulator
        requestAnimationFrame(() => this.tickFrame())
    }

    /** Ticks the emulator by an entire frame. */
    private tickFrame() {
        while(this.cpu.cycles < CYCLES_PER_FRAME)
            this.cpu.tick();

        // Reset cycle counter for frame and render framebuffer
        this.cpu.cycles -= CYCLES_PER_FRAME;
        requestAnimationFrame(() => this.tickFrame());
    }

}