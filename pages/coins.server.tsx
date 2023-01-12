import { Suspense } from "react";

const cache: any = {};
function fetchData(url: string) {
  if (!cache[url]) {
    throw Promise.all([
      fetch(url)
        .then((r) => r.json())
        .then((json) => (cache[url] = json)),
      new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random()) * 15)
      ),
    ]);
  }
  return cache[url];
}

function Coin({ id, name, symbol }: any) {
  const {
    quotes: {
      USD: { price },
    },
  } = fetchData(`https://api.coinpaprika.com/v1/tickers/${id}`);
  return (
    <div>
      <h4>List is done</h4>
      <li>
        {name} / {symbol} : ${price}
      </li>
    </div>
  );
}

function List() {
  const coins = fetchData("https://api.coinpaprika.com/v1/coins");
  console.log(coins);
  return (
    <ul>
      {coins.slice(0, 10).map((coin: any) => (
        <Suspense key={coin.id} fallback={`Coin ${coin.name} is loading`}>
          <Coin {...coin} />
        </Suspense>
      ))}
    </ul>
  );
}

export default function Coins() {
  return (
    <div>
      <h1>Welcome to RSC</h1>
      <Suspense fallback="Rendering in the server...">
        <List />
      </Suspense>
    </div>
  );
}
