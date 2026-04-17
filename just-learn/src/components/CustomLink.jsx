import { Link } from 'react-router-dom';

function CustomLink({ to, children, className }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default CustomLink;
