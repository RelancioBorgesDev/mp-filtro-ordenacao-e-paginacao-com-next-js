export const centsToBrl = (cents: number) => {
  const brl = cents / 100;

  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(brl);
};
