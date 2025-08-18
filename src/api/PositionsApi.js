import axios from '@/config/axios';

/**
 * Obtener todas las sucursales
 * GET /positions
 */
export const getAll = async () => {
  const { data } = await axios.get('/positions');
  return data;
};

/**
 * Obtener sucursales activas
 * GET /positions/active
 */
export const getActive = async () => {
  const { data } = await axios.get('/positions/active');
  return data;
};

/**
 * Obtener una sucursal por ID
 * GET /positions/{id}
 */
export const getById = async (id) => {
  const { data } = await axios.get(`/positions/${id}`);
  return data;
};

/**
 * Crear una nueva sucursal
 * POST /positions/create
 */
export const create = async (position) => {
  const { data } = await axios.post('/positions/create', {
    name: position.name,
    status_id: position.status_id,
  });
  return data;
};

/**
 * Actualizar una sucursal
 * PUT /positions/update/{id}
 */
export const update = async (id, position) => {
  const { data } = await axios.put(`/positions/update/${id}`, {
    name: position.name,
    status_id: position.status_id,
  });
  return data;
};

/**
 * Cambiar estatus (activar/desactivar)
 * PUT /positions/delete/{id}
 */
export const deleteItem = async (id) => {
  const { data } = await axios.put(`/positions/delete/${id}`);
  return data;
};
