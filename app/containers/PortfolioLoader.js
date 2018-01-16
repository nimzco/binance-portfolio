export function loadPortfolio(btcPrice) {
  const portfolio = [];
  let totalBTCValue = 0;
  const coinRows = document.querySelectorAll('.items.f-cb');

  coinRows.forEach((row) => {
    const balance = parseFloat(row.querySelector('.total').textContent);
    const name = row.querySelector('.coin').textContent;
    const total = row.querySelector('.total').textContent;
    const btcValue = parseFloat(row.querySelector('.equalValue').textContent);
    const value = (btcValue * btcPrice);

    if (name === 'Coin') { return; }
    if (btcValue === 0) { return; }

    portfolio.push({
      btcValue,
      name,
      total,
      imageURL: row.querySelector('.coin img').src,
      btcValue,
      value,
    })

    totalBTCValue += btcValue;
  });

  portfolio.map((coin) => {
    coin.percentage = (coin.btcValue * 100) / totalBTCValue;
  });

  portfolio.sort((a, b) => {
    return (a.percentage < b.percentage ? 1 : -1);
  })

  return portfolio;
}


export function portfolioTotalValue(portfolio) {
  return portfolio.map((coin) => {
    return coin.value
  }).reduce((a, b) => { return a + b; }, 0);
}
