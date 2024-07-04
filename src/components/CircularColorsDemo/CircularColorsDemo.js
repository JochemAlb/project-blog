'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const instanceId = React.useId();
  const [timerState, setTimerState] = React.useState('idle');
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const colorIndex = timeElapsed % COLORS.length;
  const selectedColor = COLORS[colorIndex];

  React.useEffect(() => {
    if (timerState === 'idle') return;

    const intervalId = setInterval(() => {
      setTimeElapsed((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerState]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={instanceId}
                  layout="position"
                  className={styles.selectedColorOutline}
                  style={{
                    zIndex: index === colorIndex ? 2 : 1,
                  }}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              if (timerState === 'idle') {
                setTimerState('running');
                setTimeElapsed(timeElapsed + 1);
              } else {
                setTimerState('idle');
              }
            }}
          >
            {timerState === 'idle' ? <Play /> : <Pause />}
            <VisuallyHidden>
              {timerState === 'idle' ? 'Play' : 'Pause'}
            </VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setTimeElapsed(0);
              setTimerState('idle');
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
