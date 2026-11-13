import {Link} from 'react-router';

function Home() {
  return (
    <section>
      <h1>🏪 小商店</h1>
      <p>第 11～19 课学的东西，全部用在这一个 app 里。</p>
      <p>
        <Link to="/products">去逛逛 →</Link>
      </p>
    </section>
  );
}

export default Home;
