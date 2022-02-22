import "./TodoCards.css";

export default function TodoCards(props: {children: any}) {
    return (
        <div className="TodoCardContainer">
            {props.children}
        </div>
    )
}