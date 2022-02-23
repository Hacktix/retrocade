import i8080 from "../../cpu/i8080/i8080";
import SpaceInvadersAudio, { SpaceInvadersSoundMap } from "./SpaceInvadersAudio";
import SpaceInvadersBus from "./SpaceInvadersBus";

export const SCREEN_WIDTH = 224;
export const SCREEN_HEIGHT = 256;
export const CYCLES_PER_SECOND = 2 * Math.pow(2, 20);
export const CYCLES_PER_FRAME = CYCLES_PER_SECOND / 60;

export type DrawFunction = (x: number, y: number, light: boolean) => void;

export enum SpaceInvadersInput {
    Left, Right, Fire, Credit, Start1P, Start2P, Tilt
}

export enum SpaceInvadersSound {
    Hit, Invader1, Invader2, Invader3, Invader4, PlayerHit, Shot, UFO
}

export enum SpaceInvadersOption {
    ShipCount, ExtraShip, DemoCoinInfo
}

export default class SpaceInvadersEmu {

    public halt = false;

    private lastTickTime = 0;
    private interruptCycles = 0;

    private bus: SpaceInvadersBus;
    private cpu: i8080;

    /** Browser-provided rendering context for drawing on the emulator canvas. */
    private renderContext: CanvasRenderingContext2D;
    /** Framebuffer Bitmap containing image data which should be rendered. Drawn to `renderContext` whenever the `render()` function is called. */
    private bitmap: ImageData;

    public constructor(rom: Uint8Array, renderContext: CanvasRenderingContext2D, soundMap: SpaceInvadersSoundMap) {
        // Initialize canvas
        this.renderContext = renderContext;
        this.bitmap = renderContext.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
        for(let i = 3; i < this.bitmap.data.length; i+= 4) {
            this.bitmap.data[i] = 255;
        }
        renderContext.putImageData(this.bitmap, 0, 0);

        // Initialize hardware
        this.cpu = new i8080();
        this.bus = new SpaceInvadersBus(rom, this.draw.bind(this), new SpaceInvadersAudio(soundMap));
        this.cpu.connectToBus(this.bus);

        // Start Emulator
        requestAnimationFrame(this.tickFrame.bind(this));
    }

    /**
     * Sets a single pixel in the framebuffer to either lit or black
     * @param x The x-Coordinate of the pixel, relative to the top left.
     * @param y The y-Coordinate of the pixel, relative to the top left.
     * @param light If `true`, the pixel will show as lit up, otherwise it will show black.
     */
    private draw(x: number, y: number, light: boolean) {
        const pixelBase = 4 * x + 4 * SCREEN_WIDTH * y;
        const colorValue = light ? (
                (y >= 32 && y <= 63) ? {r: 255, g: 0, b: 0} :
                (y >= 184 && y <= 239) ? {r: 0, g: 255, b: 0} :
                (y >= 240 && (x >= 25 && x <= 135)) ? {r: 0, g: 255, b: 0} :
                {r: 255, g: 255, b: 255}
            ) : {r: 0, g: 0, b: 0};

        this.bitmap.data[pixelBase] = colorValue.r;
        this.bitmap.data[pixelBase + 1] = colorValue.g;
        this.bitmap.data[pixelBase + 2] = colorValue.b;
    }

    /** Renders the framebuffer to the emulator canvas */
    private async render() {
        this.renderContext.putImageData(this.bitmap, 0, 0);
    }

    /** Ticks the emulator by an entire frame. */
    private tickFrame(time: number) {
        if(this.halt)
            return;

        // Calculate how much time passed since last frame
        const elapsedTime = time - this.lastTickTime;
        this.lastTickTime = time;

        // Calculate how many cycles should be executed in this call
        const cyclesToExec = Math.min(Math.round(CYCLES_PER_SECOND * (elapsedTime / 1000)), CYCLES_PER_FRAME);

        try {
            // Execute however many cycles should be executed according to calculation above
            while(this.cpu.cycles < cyclesToExec) {
                // Tick CPU and keep track of how many cycles were executed
                const cycles = this.cpu.tick();

                // Check if an interrupt should be fired
                if(this.cpu.interruptsEnabled) {
                    // If executing the last tick passed the mid-frame mark, reset to 0x08
                    if(this.interruptCycles <= (CYCLES_PER_FRAME/2) && (this.interruptCycles + cycles) >= (CYCLES_PER_FRAME/2))
                        this.cpu.reset(0x8);
                    // Otherwise, if executing the last tick passed the full frame mark, reset to 0x10
                    else if(this.interruptCycles <= CYCLES_PER_FRAME && (this.interruptCycles + cycles) >= CYCLES_PER_FRAME) {
                        this.cpu.reset(0x10);
                        this.interruptCycles -= CYCLES_PER_FRAME; // Reset interruptCycles counter to make mid-frame interrupt fire next time
                    }
                    // Update interruptCycles counter with executed cycles
                    this.interruptCycles += cycles;
                }
            }

            // Reset cycle counter in preparation for next frame
            this.cpu.cycles -= cyclesToExec;

            // Render framebuffer to canvas and bind function to be called next frame
            this.render();
            requestAnimationFrame(this.tickFrame.bind(this));
        } catch(e) {
            this.renderContext.putImageData(this.bitmap, 0, 0);
            throw e;
        }
    }

    public setInputState(input: SpaceInvadersInput, state: boolean): void {
        this.bus.input[input] = state;
    }

    public setGameOption(option: SpaceInvadersOption, value: any) {
        switch(option) {
            case SpaceInvadersOption.DemoCoinInfo:
                if(value)
                    this.bus.optionsBitOverlay |= (1 << 7);
                else
                    this.bus.optionsBitOverlay &= ~(1 << 7);
                break;
            case SpaceInvadersOption.ExtraShip:
                if(value)
                    this.bus.optionsBitOverlay |= (1 << 3);
                else
                    this.bus.optionsBitOverlay &= ~(1 << 3);
                break;
            case SpaceInvadersOption.ShipCount:
                this.bus.optionsBitOverlay &= ~(0b11);
                this.bus.optionsBitOverlay |= value;
                break;
        }
        this.cpu.reset(0);
    }

    public discard() {
        this.halt = true;
        // @ts-expect-error
        delete this.bus;
        // @ts-expect-error
        delete this.cpu;
    }

}