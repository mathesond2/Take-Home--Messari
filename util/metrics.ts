export function roundToTwoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}

function formatDate(date: Date) {
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
  return `${formattedDate} ${formattedTime}`;
}

export function formatUSD(num: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

export function parseMetricsData(key: string, val: number | string) {
  switch (key) {
    case 'rank':
      return { Rank: val };
    case 'marketcap_dominance_percent':
      return { 'Marketcap Dominance (%)': roundToTwoDecimals(val as number) };
    case 'current_marketcap_usd':
      return { 'Current Marketcap (USD)': formatUSD(val as number) };
    case 'y_2050_marketcap_usd':
      return { 'Y2050 Marketcap (USD)': formatUSD(val as number) };
    case 'y_plus10_marketcap_usd':
      return { 'Y+10 Marketcap (USD)': formatUSD(val as number) };
    case 'liquid_marketcap_usd':
      return { 'Liquid Marketcap (USD)': formatUSD(val as number) };
    case 'volume_turnover_last_24_hours_percent':
      return { 'Volume Turnover (24h) (%)': roundToTwoDecimals(val as number) };
    case 'realized_marketcap_usd':
      return { 'Realized Marketcap (USD)': formatUSD(val as number) };
    case 'outstanding_marketcap_usd':
      return { 'Outstanding Marketcap (USD)': formatUSD(val as number) };
    case 'price_usd':
      return { 'Price (USD)': formatUSD(val as number) };
    case 'price_btc':
      return { 'Price (BTC)': val };
    case 'price_eth':
      return { 'Price (ETH)': val };
    case 'volume_last_24_hours':
      return { 'Volume (24h)': val };
    case 'real_volume_last_24_hours':
      return { 'Real Volume (24h)': val };
    case 'volume_last_24_hours_overstatement_multiple':
      return { 'Volume (24h) Overstatement Multiple': val };
    case 'percent_change_usd_last_1_hour':
      return { 'USD Change (1h) (%)': roundToTwoDecimals(val as number) };
    case 'percent_change_btc_last_1_hour':
      return { 'BTC Change (1h) (%)': roundToTwoDecimals(val as number) };
    case 'percent_change_eth_last_1_hour':
      return { 'ETH Change (1h) (%)': roundToTwoDecimals(val as number) };
    case 'percent_change_usd_last_24_hours':
      return { 'USD Change (24h) (%)': roundToTwoDecimals(val as number) };
    case 'percent_change_btc_last_24_hours':
      return { 'BTC Change (24h) (%)': roundToTwoDecimals(val as number) };
    case 'percent_change_eth_last_24_hours':
      return { 'ETH Change (24h) (%)': roundToTwoDecimals(val as number) };
    case 'last_trade_at':
      return { 'Last Trade At': formatDate(new Date(val as string)) };
    default:
      return key;
  }
}
