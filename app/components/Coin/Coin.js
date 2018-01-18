import React, { PureComponent, PropTypes } from 'react';
import Price from '../../components/Price';
import styles from './Coin.css';
import classNames from 'classnames';

export default class Coin extends PureComponent {
  state = {}

  static propTypes = {
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    prices: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    repartitionPercentage: PropTypes.number.isRequired,
  };

  static contextTypes = {
    currency: PropTypes.string,
  };

  priceDif() {
    const {currency} = this.context;
    const {priceChangeValues} = this.props;
    if (!priceChangeValues) { return; }

    return <Price price={priceChangeValues[currency]} />;
  }

  percentage() {
    const {priceChangePercent} = this.props;
    if (!priceChangePercent) { return; }

    return (Number(priceChangePercent) / 100).toLocaleString('en', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  render() {
    const {
      symbol,
      imageURL,
      prices,
      total,
      repartitionPercentage,
      priceChangePercent,
      updateGrowthType,
      growthType,
    } = this.props;
    const {currency} = this.context;

    return (
      <tr className={styles.Coin}>
        <td className={styles.Name}>
          <img className={styles.Image}  src={imageURL} />
          {symbol}
        </td>
        <td className={styles.Total}>
          {total}
        </td>
        <td className={styles.Percentage}>
          {(repartitionPercentage / 100).toLocaleString('en', {style: 'percent', maximumFractionDigits: 1})}
        </td>
        <td className={styles.Price}>
          <Price price={prices[currency]} />
        </td>
        <td
          className={classNames(styles.Growth, priceChangePercent > 0 ? styles.positive : styles.negative)}
          onClick={updateGrowthType}
        >
          {growthType === '%' ? this.percentage() : this.priceDif()}
        </td>
      </tr>
    )
  }
}
