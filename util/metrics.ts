export function parseMarketCapKeys(key: string) {
  switch (key) {
    case 'rank':
      return 'Rank';
    case 'marketcap_dominance_percent':
      return 'Marketcap Dominance (%)';
    case 'current_marketcap_usd':
      return 'Current Marketcap (USD)';
    case 'y_2050_marketcap_usd':
      return 'Y2050 Marketcap (USD)';
    case 'y_plus10_marketcap_usd':
      return 'Y+10 Marketcap (USD)';
    case 'liquid_marketcap_usd':
      return 'Liquid Marketcap (USD)';
    case 'volume_turnover_last_24_hours_percent':
      return 'Volume Turnover (24h) (%)';
    case 'realized_marketcap_usd':
      return 'Realized Marketcap (USD)';
    case 'outstanding_marketcap_usd':
      return 'Outstanding Marketcap (USD)';
    //market_data
    case 'price_usd':
      return 'Price (USD)';
    case 'price_btc':
      return 'Price (BTC)';
    case 'price_eth':
      return 'Price (ETH)';
    case 'volume_last_24_hours':
      return 'Volume (24h)';
    case 'real_volume_last_24_hours':
      return 'Real Volume (24h)';
    case 'volume_last_24_hours_overstatement_multiple':
      return 'Volume (24h) Overstatement Multiple';
    case 'percent_change_usd_last_1_hour':
      return 'USD Change (1h) (%)';
    case 'percent_change_btc_last_1_hour':
      return 'BTC Change (1h) (%)';
    case 'percent_change_eth_last_1_hour':
      return 'ETH Change (1h) (%)';
    case 'percent_change_usd_last_24_hours':
      return 'USD Change (24h) (%)';
    case 'percent_change_btc_last_24_hours':
      return 'BTC Change (24h) (%)';
    case 'percent_change_eth_last_24_hours':
      return 'ETH Change (24h) (%)';
    case 'ohlcv_last_1_hour':
      return 'OHLCV (1h)';
    case 'ohlcv_last_24_hour':
      return 'OHLCV (24h)';
    case 'last_trade_at':
      return 'Last Trade At';
    default:
      return key;
  }
}
