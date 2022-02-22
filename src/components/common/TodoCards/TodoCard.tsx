import "./TodoCards.css";

export type TodoCardProps = {
    text: string,
    done?: boolean
}

export default function TodoCard(props: TodoCardProps) {
    return (
        <div className="TodoCard">
            <div className="TodoCardCheck">{props.done ? "✔️" : "⌛"}</div>
            <div className="TodoCardText">{props.text}</div>
        </div>
    )
}