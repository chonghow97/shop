import {Link} from 'react-router';

function NotFound() {
  return (
    <section>
      <h1>404：找不到这一页</h1>
      <Link to="/">回首页</Link>
    </section>
  );
}

export default NotFound;
