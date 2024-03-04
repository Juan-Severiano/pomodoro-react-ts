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
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting])

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, timeConting ? 1000 : null)

  const configureWork = () => {
    setTimeConting(true);
    setWorking(true)
    setResting(false);
    setMainTime(props.pomodoroTime)
  }

  const configureRest = (long: boolean) => {
    setTimeConting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime)
    } else {
      setMainTime(props.shortRestTime)
    }
  }

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text='Work' onClick={() => configureWork()} />
        <Button text='Rest' onClick={() => configureRest(false)} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeConting ? 'Pause' : 'Play'}
          onClick={() => setTimeConting(!timeConting)}
        />
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
