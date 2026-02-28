// components/Board.tsx
interface Props {
    grid: string[][];
}

export function Board({ grid }: Props) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 30px)" }}>
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: 30,
                            height: 30,
                            border: "1px solid black",
                            backgroundColor: getColor(cell)
                        }}
                    />
                ))
            )}
        </div>
    );
}

function getColor(status: string) {
    switch (status) {
        case "ship":
            return "gray";
        case "hit":
            return "red";
        case "miss":
            return "lightblue";
        case "sunk":
            return "darkred";
        default:
            return "white";
    }
}