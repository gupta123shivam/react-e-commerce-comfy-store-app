export const formatPrice = (price) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
  return newNumber;
};

export const getUniqueValues = (products, label) => {
  if (label !== "colors") {
    const labels = Array.from(
      new Set(products.map((product) => product[label]))
    );
    labels.unshift("all");
    return labels;
  }
  let labels = [];
  for (const product of products) {
    for (const color of product[label]) {
      labels.push(color);
    }
  }
  labels = Array.from(new Set(labels));
  labels.unshift('all')
  return labels;
};
