import i8080 from "../../cpu/i8080/i8080";
import SpaceInvadersBus from "./SpaceInvadersBus";

export const SCREEN_WIDTH = 224;
export const SCREEN_HEIGHT = 256;

export type DrawFunction = (x: number, y: number, light: boolean) => void;

export default class SpaceInvadersEmu {

    private bus: SpaceInvadersBus;
    private cpu: i8080;

    /** Browser-provided rendering context for drawing on the emulator canvas. */
    private renderContext: CanvasRenderingContext2D;
    /** Framebuffer Bitmap containing image data which should be rendered. Drawn to `renderContext` whenever the `render()` function is called. */
    private bitmap: ImageData;

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

    /** Render the entire framebuffer to the canvas. */
    private render() {
        this.renderContext.putImageData(this.bitmap, 0, 0);
    }

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
        this.bus = new SpaceInvadersBus(rom, this.draw, this.render);
        this.cpu.connectToBus(this.bus);
    }

}