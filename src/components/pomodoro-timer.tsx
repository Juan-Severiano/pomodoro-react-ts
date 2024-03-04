import { useEffect, useState } from "react"
import { useInterval } from "../hooks/use-interval";
import { Button } from "./button";
import { Timer } from "./timer";
import bellStart from '../assets/sounds/bell-start.mp3';
import bellFinish from '../assets/sounds/bell-finish.mp3';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
  const [cycles, setCycles] = useState(new Array(props.cycles -1).fill(true))

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return

    if (working && cycles.length > 0) {
      configureRest(false);
      cycles.pop()
    } else if (working && cycles.length <= 0) {
      configureRest(false);
      setCycles(new Array(props.cycles -1).fill(true))
    }
  }, [working, resting, mainTime, cycles, props.cycles])

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, timeConting ? 1000 : null)

  const configureWork = () => {
    setTimeConting(true);
    setWorking(true)
    setResting(false);
    setMainTime(props.pomodoroTime)
    audioStartWorking.play()
  }

  const configureRest = (long: boolean) => {
    setTimeConting(true);
    setWorking(false);
    setResting(true);
    audioStopWorking.play()
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
