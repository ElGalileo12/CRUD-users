export type User = {
  id: string;
  title?: "mr" | "ms" | "mrs" | "miss" | "dr" | string;
  firstName: string;
  lastName: string;
  picture?: string;
  gender?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  registerDate?: string;
  updatedDate?: string;
  location?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    timezone?: string;
  };
};

export type UsersListResponse = {
  data: User[];
  total: number;
  page: number;
  limit: number;
};
