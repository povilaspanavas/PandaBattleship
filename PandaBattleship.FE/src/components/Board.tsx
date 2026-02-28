interface BoardProps {
    grid: string[][];
    onClick?: (x: number, y: number) => void;
}

export const Board: React.FC<BoardProps> = ({ grid, onClick }) => {
    return (
        <div style={{ display: "inline-block", margin: 10 }}>
            {grid.map((row, i) => (
                <div key={i} style={{ display: "flex" }}>
                    {row.map((cell, j) => (
                        <div
                            key={j}
                            onClick={() => onClick?.(i, j)}
                            style={{
                                width: 30,
                                height: 30,
                                border: "1px solid black",
                                backgroundColor:
                                    cell === "empty" ? "white" :
                                        cell === "ship" ? "gray" :
                                            cell === "hit" ? "red" :
                                                cell === "miss" ? "lightblue" :
                                                    "yellow"
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};