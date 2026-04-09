function SVG({ id, width, height, svgStyles, useStyles }) {
  return (
    <svg width={width} height={height} className={svgStyles}>
      <use className={useStyles} href={`/sprites.svg#${id}`}></use>
    </svg>
  );
}

export default SVG;
