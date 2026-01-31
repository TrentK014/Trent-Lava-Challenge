export const SALE_DISCOUNT_PERCENT = 35;
export const SALE_MULTIPLIER = 0.65;

export const getSaleDisplay = (price: number, isOnSale: boolean) => {
  if (!isOnSale) {
    return { originalPrice: undefined, discount: undefined };
  }

  const originalPrice = Math.round(price / SALE_MULTIPLIER);

  return { originalPrice, discount: SALE_DISCOUNT_PERCENT };
};
