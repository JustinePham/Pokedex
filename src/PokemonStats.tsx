import './componentStyles.scss';

export function Stats(props) {
  return (
    <div className="stats-grid">
      {props.pstats?.map((stat) => {
        return (
          <>
            <div
              className="grid-item left"
              key={stat.stat.name + '-key-' + props.id}
            >
              {stat.stat.name}
            </div>
            <div
              className="grid-item right"
              key={stat.stat.name + '-value-' + props.id}
            >
              {stat.base_stat}
            </div>
          </>
        );
      })}
    </div>
  );
}
