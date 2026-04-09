import { Link } from 'react-router-dom';

function CustomLink({ to, children, text, styles }) {
  return (
    <Link to={to} className={styles}>
      {text}
      {children}
    </Link>
  );
}

export default CustomLink;
