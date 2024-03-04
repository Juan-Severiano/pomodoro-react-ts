import { useState } from "react"
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Timer } from "./timer";

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, 1000)

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text='Say hello' onClick={() => console.log('Hi')} />
        <Button text='Say hello' onClick={() => console.log('Hi')} />
        <Button text='Say hello' onClick={() => console.log('Hi')} />
        <Button text='Say hello' onClick={() => console.log('Hi')} />
      </div>
      <div className="details">
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
      </div>
    </div>
  )
}
