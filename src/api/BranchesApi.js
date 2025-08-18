import axios from '@/config/axios';

/**
 * Obtener todas las sucursales
 * GET /branches
 */
export const getAll = async () => {
  const { data } = await axios.get('/branches');
  return data;
};

/**
 * Obtener sucursales activas
 * GET /branches/active
 */
export const getActive = async () => {
  const { data } = await axios.get('/branches/active');
  return data;
};

/**
 * Obtener una sucursal por ID
 * GET /branches/{id}
 */
export const getById = async (id) => {
  const { data } = await axios.get(`/branches/${id}`);
  return data;
};

/**
 * Crear una nueva sucursal
 * POST /branches/create
 */
export const create = async (branch) => {
  const { data } = await axios.post('/branches/create', {
    name: branch.name,
    streat: branch.streat,
    city: branch.city,
    state: branch.state,
    country: branch.country,
    zip: branch.zip,
    phone: branch.phone || null,
  });
  return data;
};

/**
 * Actualizar una sucursal
 * PUT /branches/update/{id}
 */
export const update = async (id, branch) => {
  const { data } = await axios.put(`/branches/update/${id}`, {
    name: branch.name,
    streat: branch.streat,
    city: branch.city,
    state: branch.state,
    country: branch.country,
    zip: branch.zip,
    phone: branch.phone || null,
    status_id: branch.status_id,
  });
  return data;
};

/**
 * Cambiar estatus (activar/desactivar)
 * PUT /branches/delete/{id}
 */
export const deleteItem = async (id) => {
  const { data } = await axios.put(`/branches/delete/${id}`);
  return data;
};
