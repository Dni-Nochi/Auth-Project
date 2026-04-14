import { Link } from 'react-router-dom';

function CustomLink({ to, children, styles }) {
  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
}

export default CustomLink;
