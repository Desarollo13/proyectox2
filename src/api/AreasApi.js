import axios from '@/config/axios';

/**
 * Obtener todas las áreas
 * GET /areas
 */
export const getAll = async () => {
  const { data } = await axios.get('/areas');
  return data;
};

/**
 * Obtener áreas activas
 * GET /areas/active
 */
export const getActive = async () => {
  const { data } = await axios.get('/areas/active');
  return data;
};

/**
 * Obtener un área por ID
 * GET /areas/{id}
 */
export const getById = async (id) => {
  const { data } = await axios.get(`/areas/${id}`);
  return data;
};

/**
 * Crear una nueva área
 * POST /areas/create
 */
export const create = async (area) => {
  const { data } = await axios.post('/areas/create', {
    name: area.name,
    status_id: area.status_id,
  });
  return data;
};

/**
 * Actualizar un área
 * PUT /areas/update/{id}
 */
export const update = async (id, areas) => {
  const { data } = await axios.put(`/areas/update/${id}`, {
    name: areas.name,
    status_id: areas.status_id,
  });
  return data;
};


/**
 * Cambiar estatus (activar/desactivar)
 * PUT /areas/delete/{id}
 */
export const deleteItem = async (id) => {
  const { data } = await axios.put(`/areas/delete/${id}`);
  return data;
};
