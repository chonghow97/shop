import {Link} from 'react-router';

function Home() {
  return (
    <section>
      <h1>🏪 小商店</h1>
      <p>欢迎光临！今天全场八折。</p>
      <p>
        <Link to="/products">去逛逛 →</Link>
      </p>
    </section>
  );
}

export default Home;
