import { LinearProgress } from "@rneui/themed"
import React from "react"

interface DeterminateLinearProgressProps {
    //milliseconds
    duration: number
    onEnd?: () => void
}

const useProgress = (duration: number, interval = 300) => {
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
  
    //console.log(elapsedTime, progress)
    React.useEffect(() => {
      const intervalId = setInterval(() => {
        if (progress < 1) {
          setElapsedTime(t => t + interval);
        }
      }, interval);
  
      return () => clearInterval(intervalId);
    }, []);
  
    React.useEffect(() => {
      setProgress(elapsedTime / duration);
    }, [elapsedTime]);
  
    return progress;
  };

const DeterminateLinearProgress: React.FC<DeterminateLinearProgressProps> = ({ duration, onEnd }) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        let subs = true;
        if (progress < 1) {
          setTimeout(() => {
            if (subs) {
              setProgress(progress + 0.01);
            }
          }, 1);
        }
        else {
            onEnd?.()
        }
        return () => {
          subs = false;
        };
      }, [progress]);

    return (
        <LinearProgress
            animation={false} //{{ duration: 10 }}
            value={progress}
            variant="determinate"
        />
    )
}

export default DeterminateLinearProgress