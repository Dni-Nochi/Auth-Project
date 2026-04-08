function LoadingScrean({ text, styles }) {
  console.log(text, styles);
  return <p className={styles.loading}>{text}</p>;
}

export default LoadingScrean;
