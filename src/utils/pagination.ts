export interface PaginationParams {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
}

export const getPaginationOptions = ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}: PaginationParams) => {
  const skip = (Number(page) - 1) * Number(limit);
  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  return {
    skip,
    limit: Number(limit),
    sort,
  };
};
