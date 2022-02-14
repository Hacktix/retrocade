import './ProgressBar.css';

type ProgressBarProps = {
    /** A value between 0 and 100 representing the fullness of the progress bar. */
    value: number,
    /** A string which is displayed in parentheses after the filled percentage of the progress bar. */
    status?: string,
    /** The value to which the `background-color` CSS property of the filled section of the progress bar should be set. Default: `green` */
    fillColor?: string,
    /** The value to which the `color` CSS property of the filled section of the progress bar should be set. Default: `white` */
    textColor?: string
}

export default function ProgressBar(props: ProgressBarProps) {
    const fillValue = Math.round(Math.max(0, Math.min(100, props.value)));
    const fillStyle: React.CSSProperties = {
        width: `${fillValue}%`,
        backgroundColor: props.fillColor || "green",
        color: props.textColor || "white"
    };

    return (
        <div className="ProgressBar">
            <div className="ProgressBarFilledSection" style={fillStyle}>
                {fillValue > 0 && `${fillValue}%`}
                {fillValue > 0 && props.status && ` (${props.status})`}
            </div>
            <div className="ProgressBarEmptySection">
                {fillValue === 0 && "0%"}
                {fillValue === 0 && props.status && ` (${props.status})`}
            </div>
        </div>
    )
}