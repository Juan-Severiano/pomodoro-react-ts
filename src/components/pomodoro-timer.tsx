import { useEffect, useState } from "react"
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
  const [timeConting, setTimeConting] = useState(false);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working])

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, timeConting ? 1000 : null)

  const configureWork = () => {
    setTimeConting(true);
    setWorking(true)
  }

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text='Work' onClick={() => configureWork()} />
        <Button text='Say hello' onClick={() => console.log('Hi')} />
        <Button text={timeConting ? 'Pause' : 'Play'} onClick={() => setTimeConting(!timeConting)} />
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
