import "./ToggleSwitch.css";

export type ToggleSwitchProps = {
    title: string,
    leftOption?: string,
    rightOption?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
    return (
        <div>
        <b>{props.title}</b>
        <br />
        <div className="SwitchContainer">
            {props.leftOption}
            <label className="Switch">
                <input type="checkbox" onChange={props.onChange}/>
                <span className="Slider"></span>
            </label>
            {props.rightOption}
        </div>
        </div>
    )
}