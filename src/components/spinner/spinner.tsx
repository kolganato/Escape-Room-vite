import styles from './spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <div className={styles.spinner}>
      <svg
        className={styles.pl}
        viewBox="0 0 160 160"
        width="160px"
        height="160px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="a" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="b">
            <path fill="url(#a)" d="M0 0H160V160H0z" />
          </mask>
          <mask id="c">
            <path fill="url(#a)" d="M28 28H132V132H28z" />
          </mask>
        </defs>
        <g className={styles.pl__ring_rotate}>
          <circle
            className={styles.pl__ring_stroke}
            cx={80}
            cy={80}
            r={72}
            fill="none"
            stroke="hsl(223,90%,55%)"
            strokeWidth={16}
            strokeDasharray="452.39 452.39"
            strokeDashoffset={452}
            strokeLinecap="round"
            transform="rotate(-45 80 80)"
          />
        </g>
        <g className={styles.pl__ring_rotate} mask="url(#b)">
          <circle
            className={styles.pl__ring_stroke}
            cx={80}
            cy={80}
            r={72}
            fill="none"
            stroke="hsl(193,90%,55%)"
            strokeWidth={16}
            strokeDasharray="452.39 452.39"
            strokeDashoffset={452}
            strokeLinecap="round"
            transform="rotate(-45 80 80)"
          />
        </g>
        <g
          strokeWidth={4}
          strokeDasharray="12 12"
          strokeDashoffset={12}
          strokeLinecap="round"
          transform="translate(80 80)"
        >
          <path
            className={styles.pl__tick}
            stroke="hsl(223,10%,90%)"
            transform="rotate(-135 8.284 -20)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_2}`}
            stroke="hsl(223,10%,90%)"
            transform="rotate(-90 20 -20)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_3}`}
            stroke="hsl(223,10%,90%)"
            transform="rotate(-45 48.284 -20)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_4}`}
            stroke="hsl(223,10%,90%)"
            transform="translate(0 40)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_5}`}
            stroke="hsl(223,10%,90%)"
            transform="rotate(45 -48.284 -20)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_6}`}
            stroke="hsl(223,10%,90%)"
            transform="rotate(90 -20 -20)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_7}`}
            stroke="hsl(223,10%,90%)"
            transform="rotate(135 -8.284 -20)"
            d="M0 2L0 14"
          />
          <path
            className={`${styles.pl__tick} ${styles.pl__tick_child_8}`}
            stroke="hsl(223,10%,90%)"
            transform="rotate(180 0 -20)"
            d="M0 2L0 14"
          />
        </g>
        <g mask="url(#b)">
          <g
            strokeWidth={4}
            strokeDasharray="12 12"
            strokeDashoffset={12}
            strokeLinecap="round"
            transform="translate(80 80)"
          >
            <path
              className={styles.pl__tick}
              stroke="hsl(223,90%,80%)"
              transform="rotate(-135 8.284 -20)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_2}`}
              stroke="hsl(223,90%,80%)"
              transform="rotate(-90 20 -20)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_3}`}
              stroke="hsl(223,90%,80%)"
              transform="rotate(-45 48.284 -20)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_4}`}
              stroke="hsl(223,90%,80%)"
              transform="translate(0 40)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_5}`}
              stroke="hsl(223,90%,80%)"
              transform="rotate(45 -48.284 -20)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_6}`}
              stroke="hsl(223,90%,80%)"
              transform="rotate(90 -20 -20)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_7}`}
              stroke="hsl(223,90%,80%)"
              transform="rotate(135 -8.284 -20)"
              d="M0 2L0 14"
            />
            <path
              className={`${styles.pl__tick} ${styles.pl__tick_child_8}`}
              stroke="hsl(223,90%,80%)"
              transform="rotate(180 0 -20)"
              d="M0 2L0 14"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Spinner;
