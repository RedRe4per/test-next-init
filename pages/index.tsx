import { useState } from "react";

export default function Home() {
  const [forward, setForward] = useState("right");
  const scale = 12;
  const startPoint = Math.ceil(scale / 2);

  const boardArray: any = [];
  for (let i = 0; i < scale; i++) {
    boardArray[i] = [];
    for (let j = 0; j < scale; j++) {
      boardArray[i][j] = 0;
    }
  }

  const snake: any = [];
  snake.push(
    { x: startPoint, y: startPoint - 1 },
    { x: startPoint, y: startPoint }
  );
  console.log(snake);

  let ball: { x: number; y: number } = { x: 8, y: 6 };

  boardArray[startPoint][startPoint] = 1;
  boardArray[startPoint][startPoint - 1] = 1;

  return (
    <>
      <main className="bg-gray-700 text-white h-[100vh]">
        <section className="pt-6 pl-20">
          <input type="text" placeholder="Input scale" />
          <span> go</span>
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
                      <div>
                        {ball.x === index1 && ball.y === index2 ? "3" : "1"}
                      </div>
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
