export const calculateFees = (price, quantity) => {
  const subtotal = price * quantity;
  const platformFeePercent = Number(process.env.PLATFORM_FEE_PERCENT) || 5;
  const platformFee = subtotal * (platformFeePercent / 100);
  const sellerAmount = subtotal - platformFee;
  return { subtotal, platformFee, sellerAmount };
};
