import i8080 from "../../cpu/i8080/i8080";
import SpaceInvadersBus from "./SpaceInvadersBus";

export const SCREEN_WIDTH = 224;
export const SCREEN_HEIGHT = 256;
export const CYCLES_PER_FRAME = 32768;

export type DrawFunction = (x: number, y: number, light: boolean) => void;

export default class SpaceInvadersEmu {

    private bus: SpaceInvadersBus;
    private cpu: i8080;

    /** Browser-provided rendering context for drawing on the emulator canvas. */
    private renderContext: CanvasRenderingContext2D;
    /** Framebuffer Bitmap containing image data which should be rendered. Drawn to `renderContext` whenever the `render()` function is called. */
    private bitmap: ImageData;

    public constructor(rom: Uint8Array, renderContext: CanvasRenderingContext2D) {
        // Initialize canvas
        this.renderContext = renderContext;
        this.bitmap = renderContext.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
        for(let i = 3; i < this.bitmap.data.length; i+= 4) {
            this.bitmap.data[i] = 255;
        }
        renderContext.putImageData(this.bitmap, 0, 0);

        // Initialize hardware
        this.cpu = new i8080();
        this.bus = new SpaceInvadersBus(rom, this.draw.bind(this));
        this.cpu.connectToBus(this.bus);

        // Start Emulator
        requestAnimationFrame(() => this.tickFrame())
    }

    /**
     * Sets a single pixel in the framebuffer to either lit or black
     * @param x The x-Coordinate of the pixel, relative to the top left.
     * @param y The y-Coordinate of the pixel, relative to the top left.
     * @param light If `true`, the pixel will show as lit up, otherwise it will show black.
     */
    private draw(x: number, y: number, light: boolean) {
        const pixelBase = 4 * x + 4 * SCREEN_WIDTH * y;
        const colorValue = light ? 255 : 0;

        this.bitmap.data[pixelBase] = colorValue;
        this.bitmap.data[pixelBase + 1] = colorValue;
        this.bitmap.data[pixelBase + 2] = colorValue;
    }

    private async render() {
        this.renderContext.putImageData(this.bitmap, 0, 0);
    }

    /** Ticks the emulator by an entire frame. */
    private tickFrame() {
        try {
            // Tick until first half of frame is done, fire interrupt if enabled
            while(this.cpu.cycles < (CYCLES_PER_FRAME / 2))
                this.cpu.tick();
            if(this.cpu.interruptsEnabled)
                this.cpu.reset(0x8);

            // Continue ticking until full frame is done, fire interrupt if enabled
            while(this.cpu.cycles < CYCLES_PER_FRAME)
                this.cpu.tick();
            if(this.cpu.interruptsEnabled)
                this.cpu.reset(0x10);

            // Reset cycle counter for frame and render framebuffer
            this.cpu.cycles -= CYCLES_PER_FRAME;
            this.render();
            requestAnimationFrame(() => this.tickFrame());
        } catch(e) {
            this.renderContext.putImageData(this.bitmap, 0, 0);
            throw e;
        }
    }

}