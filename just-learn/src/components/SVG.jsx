function SVG({ id, width, height, className, useClassName, onClick }) {
  return (
    <svg width={width} height={height} className={className} onClick={onClick}>
      <use className={useClassName} href={`/sprites.svg#${id}`}></use>
    </svg>
  );
}

export default SVG;
