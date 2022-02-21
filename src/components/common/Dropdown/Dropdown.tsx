import "./Dropdown.css"

export type DropdownProps = {
    title: string,
    children: any,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export default function Dropdown(props: DropdownProps) {
    return (
        <div>
            <b>{props.title}</b>
            <br />
            <select className="Dropdown" onChange={props.onChange}>
                {props.children}
            </select>
        </div>
    )
}