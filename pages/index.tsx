import { useState } from "react";

interface IRobot {
  position: {
    x: number;
    y: number;
  };
  orient: "N" | "S" | "E" | "W";
  instruction: string;
  isLost: boolean;
}

interface IScent {
  x: number;
  y: number;
}

interface IPrevPosition {
  position: {
    x: number;
    y: number;
  };
  orient: "N" | "S" | "E" | "W";
}

export default function Home() {
  const [xScope, setXScope] = useState(5);
  const [yScope, setYScope] = useState(3);
  const [robots, setRobots] = useState<IRobot[]>([
    {
      position: { x: 1, y: 1 },
      orient: "E",
      instruction: "RFRFRFRF",
      isLost: false,
    },
    {
      position: { x: 3, y: 2 },
      orient: "N",
      instruction: "FRRFLLFFRRFLL",
      isLost: false,
    },
  ]);
  //const [scents, setScents] = useState<IScent[]>([]);
  const scents: any[] = [];
  const robotResults: any[] = [];

  const handleXScope = (e: any) => {
    if (e.target.value > 0 && e.target.value <= 50) {
      setXScope(e.target.value);
    }
  };

  const handleYScope = (e: any) => {
    if (e.target.value > 0 && e.target.value <= 50) {
      setYScope(e.target.value);
    }
  };

  const turnRight = (orient: "N" | "S" | "E" | "W") => {
    if (orient === "N") return "E";
    if (orient === "E") return "S";
    if (orient === "S") return "W";
    if (orient === "W") return "N";
  };

  const turnLift = (orient: "N" | "S" | "E" | "W") => {
    if (orient === "N") return "W";
    if (orient === "W") return "S";
    if (orient === "S") return "E";
    if (orient === "E") return "N";
  };

  // const scentTest = (prevPosition: IPrevPosition) => {
  //   let isScentTested = false;
  //   const nextPosition = prevPosition.position;
  //   if(prevPosition.orient === "N"){
  //     nextPosition.y = nextPosition.y + 1;
  //   } else if (prevPosition.orient === "S"){
  //     nextPosition.y = nextPosition.y - 1;
  //   } else if (prevPosition.orient === "E"){
  //     nextPosition.x = nextPosition.x + 1;
  //   } else if (prevPosition.orient === "W"){
  //     nextPosition.x = nextPosition.x - 1;
  //   }

  //   for(let i=0; i<scents.length; i++){

  //   }

  //   return isScentTested;
  // }

  const getNewPosition = (prevPosition: IPrevPosition) => {
    // if(scentTest(prevPosition)) return;

    const position = prevPosition.position;
    let isLost = false;
    if (prevPosition.orient === "N") {
      position.y = position.y + 1;
    } else if (prevPosition.orient === "S") {
      position.y = position.y - 1;
    } else if (prevPosition.orient === "E") {
      position.x = position.x + 1;
    } else if (prevPosition.orient === "W") {
      position.x = position.x - 1;
    }

    if (
      position.x < 0 ||
      position.y < 0 ||
      position.x > xScope - 1 ||
      position.y > yScope - 1
    ) {
      isLost = true;
      scents.push(position);
    }

    console.log(
      "orientation:",
      prevPosition.orient,
      "| new position:",
      position,
      "| isLost? :",
      isLost
    );

    return { position, isLost };
  };

  const handleStart = () => {
    while (robots.length > 0) {
      console.log("new robot run, instruction:", robots[0].instruction);

      while (robots[0].instruction.length > 0) {
        console.log(
          "remaining instructions:",
          robots[0].instruction,
          robots[0].instruction.length
        );
        if (robots[0].instruction.length > 0) {
          if (robots[0].instruction[0] === "R") {
            robots[0].orient = turnRight(robots[0].orient) as
              | "N"
              | "S"
              | "E"
              | "W";
          } else if (robots[0].instruction[0] === "L") {
            robots[0].orient = turnLift(robots[0].orient) as
              | "N"
              | "S"
              | "E"
              | "W";
          } else if (robots[0].instruction[0] === "F") {
            const newStatus = getNewPosition({
              position: robots[0].position,
              orient: robots[0].orient,
            });
            robots[0].position = newStatus.position;
            robots[0].isLost = newStatus.isLost;

            if (newStatus.isLost) break;
          }

          robots[0].instruction = robots[0].instruction.slice(1);
        }
      }

      robotResults.push(robots[0]);
      robots.shift();
    }

    console.log("robotResults:", robotResults, "scents:", scents);
  };

  return (
    <>
      <main className="bg-gray-800 text-white h-[100vh] p-12">
        <h2>Martian Robots </h2>
        <section className="mt-4">
          <span>X scope: </span>
          <input
            className="text-black w-12"
            type="number"
            onChange={(e) => handleXScope(e)}
            value={xScope}
          />
          <span className="ml-4">Y scope: </span>
          <input
            className="text-black w-12"
            type="number"
            onChange={(e) => handleYScope(e)}
            value={yScope}
          />
        </section>
        <section className="mt-4">
          <p>Robots</p>
        </section>
        <section className="mt-4">
          <button className="bg-green-500 p-2 rounded-sm" onClick={handleStart}>
            Start
          </button>
        </section>
        <section className="mt-8"></section>
      </main>
    </>
  );
}
