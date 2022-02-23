import "./Slider.css";

export type SliderProps = {
    label?: string,
    value: number,
    min?: number,
    max?: number,
    showValue?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function Slider(props: SliderProps) {
    return (
        <div className="SliderContainer">
            <p className="SliderLabel">{props.label}</p>
            <input type="range" min={props.min || 0} max={props.max || 100} value={props.value} onChange={props.onChange}/>
            <p className="SliderLabel">{props.showValue ? props.value : ""}</p>
        </div>
    )
}