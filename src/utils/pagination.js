export const paginate = (items, page, limit) => {

  const start = (page - 1) * limit;
  const end = start + limit;

  return items.slice(start, end);
};

export const totalPages = (items, limit) => {
  return Math.ceil(items.length / limit);
};