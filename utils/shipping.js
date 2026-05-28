const SHIPPING_RATES = {
  default: 30000,
  hcm: 20000,
  hn: 20000,
};

const HCM_KEYS = ["79", "hồ chí minh", "ho chi minh", "hcm", "tp hồ chí minh", "tp. hồ chí minh"];
const HN_KEYS = ["01", "hà nội", "ha noi", "hn"];

function calculate(province) {
  if (!province) return SHIPPING_RATES.default;
  const input = province.toString().toLowerCase().trim();

  if (HCM_KEYS.some((k) => input.includes(k))) return SHIPPING_RATES.hcm;
  if (HN_KEYS.some((k) => input.includes(k))) return SHIPPING_RATES.hn;
  return SHIPPING_RATES.default;
}

module.exports = { calculate, SHIPPING_RATES };
