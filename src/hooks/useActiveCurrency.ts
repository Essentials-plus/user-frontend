const useActiveCurrency = () => {
  const currency_type = process.env.NEXT_PUBLIC_CURRENCY_TYPE as "eur" | "usd";

  const currency_symbol = currency_type == "eur" ? "€" : "$";

  return { currency_type: currency_type || "eur", currency_symbol };
};

export default useActiveCurrency;
