import { api } from "./api";
import type { UsersListResponse, User } from "../types/user.ts";

//Petición para traer toda la lista de los usuarios
export async function fetchUsers(
  page = 1,
  limit = 6
): Promise<UsersListResponse> {
  const { data } = await api.get<UsersListResponse>("/user", {
    params: { page, limit },
  });
  return data;
}

//Petición para traer los datos especificos de un usuario
export async function fetchUser(id: string): Promise<User> {
  const { data } = await api.get<User>(`/user/${id}`);
  return data;
}

//Petición para la creación de un nuevo usuario
export async function createUser(body: Partial<User>): Promise<User> {
  const { data } = await api.post<User>("/user/create", body);
  return data;
}

//Petición para actualizar datos de un usuario especifico
export async function updateUser(
  id: string,
  body: Partial<User>
): Promise<User> {
  const { data } = await api.put<User>(`/user/${id}`, body);
  return data;
}

//Petición para eliminar un usaurio
export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/user/${id}`);
}
