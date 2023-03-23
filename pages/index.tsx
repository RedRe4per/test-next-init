import { useState } from "react";

export default function Home() {
  const scale = 12;
  let threadId: any = 0;
  const startPoint = Math.ceil(scale / 2);
  const [forward, setForward] = useState("right");
  const [snake, setSnake] = useState<any[]>([
    { x: startPoint, y: startPoint - 1 },
    { x: startPoint, y: startPoint },
  ]);
  const [render, setRender] = useState(0);
  const [ball, setBall] = useState<any>({ x: 8, y: 6 });

  const boardArray: any = [];
  for (let i = 0; i < scale; i++) {
    boardArray[i] = [];
    for (let j = 0; j < scale; j++) {
      boardArray[i][j] = 0;
    }
  }

  const handleGo = () => {
    threadId = setInterval(() => {
      console.log(snake, forward);
      let newSnake = snake;
      let newPosition = {
        x:
          snake[snake.length - 1].x +
          (forward === "right" ? 1 : forward === "left" ? -1 : 0),
        y:
          snake[snake.length - 1].y +
          (forward === "up" ? -1 : forward === "down" ? 1 : 0),
      };
      if (newPosition.x > scale - 1) {
        newPosition.x = 0;
      }
      if (newPosition.y > scale - 1) {
        newPosition.y = 0;
      }
      if (newPosition.x < 0) {
        newPosition.x = scale - 1;
      }
      if (newPosition.y < 0) {
        newPosition.y = scale - 1;
      }
      newSnake.push(newPosition);

      snake[snake.length - 1].x === ball.x &&
      snake[snake.length - 1].y === ball.y
        ? setBall({ x: 1, y: 1 })
        : newSnake.shift();
      setSnake(newSnake);
      setRender((prev) => prev + 1);
    }, 600);
  };

  const handleEnd = () => {
    clearInterval(threadId);
  };

  return (
    <>
      <main className="bg-gray-700 text-white h-[100vh]">
        <section className="pt-6 pl-20">
          <input type="text" placeholder="Input scale" />
          <span> go</span>
          <button onClick={handleGo} className="pl-5">
            start
          </button>
          <button onClick={handleEnd} className="pl-5">
            end
          </button>
          <section className="flex gap-5">
            <button onClick={() => setForward("up")}>up</button>
            <button onClick={() => setForward("down")}>down</button>
            <button onClick={() => setForward("left")}>left</button>
            <button onClick={() => setForward("right")}>right</button>
          </section>
        </section>
        <section className="pt-16 pl-10">
          {boardArray.map((row: any, index1: number) => {
            return (
              <div className="flex" key={index1}>
                {row.map((column: any, index2: number) => {
                  return (
                    <div
                      className={`w-16 h-16 border border-gray-400 ${
                        snake.findIndex(
                          (item: any) => item.x === index1 && item.y === index2
                        ) < 0
                          ? ball.x === index1 && ball.y === index2
                            ? "bg-red-500"
                            : ""
                          : "bg-blue-600"
                      }`}
                      key={index2}
                    >
                      <div>
                        {index1}:{index2}
                      </div>
                      <div className="text-gray-700">{render}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
