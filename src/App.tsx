import { PomodoroTimer } from "./components/pomodoro-timer"

function App(): JSX.Element {

  return (
    <>
      <PomodoroTimer defaultPomodoroTime={1500} />
    </>
  )
}

export default App
