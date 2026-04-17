function SVG({ id, width, height, className, useClassName }) {
  return (
    <svg width={width} height={height} className={className}>
      <use className={useClassName} href={`/sprites.svg#${id}`}></use>
    </svg>
  );
}

export default SVG;
