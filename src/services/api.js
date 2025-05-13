import axios from 'axios';
import { parseJwt } from '@/services/utils/jwt.js';

const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl1 = import.meta.env.VITE_API_URL_1;
const apiUrl2 = import.meta.env.VITE_API_URL_2
const apiUrl3 = import.meta.env.VITE_API_URL_3

// Vérifier si l'utilisateur est connecté
export const isLoggedIn = () => {
  return localStorage.getItem('access_token')
 !== null;
};

// Vérifier les rôles
export const isAdmin = () => localStorage.getItem('role') === 'admin';
export const isUser = () => localStorage.getItem('role') === 'user';
export const isDeletedUser = () => localStorage.getItem('role') === 'deleted_user';
export const isSuspendedUser = () => localStorage.getItem('role') === 'suspended_user';

export const isNormalOrAdmin = () => {
  const role = localStorage.getItem('role');
  return role === 'user' || role === 'admin';
};
export const isNormalOrDeletedUser = () => {
  const role = localStorage.getItem('role');
  return role === 'user' || role === 'deleted_user';
};
export const isNormalOrSuspendedUser = () => {
  const role = localStorage.getItem('role');
  return role === 'user' || role === 'suspended_user';
};

// ====================================
// ==== FONCTIONS POUR L'ADMIN ========
// ====================================

// === Fonction utilitaire : ajoute le token dans les headers ===
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  const decoded = parseJwt(token);
  return decoded?.id || null; // ou 'user_id', selon ton backend
};

// =============================
// ==== FONCTIONS POUR ADMIN ===
// =============================

// 1. Récupérer tous les utilisateurs
export const getUsers = () => {
  return axios.get(`${apiUrl}/admin/get_all`, getAuthHeaders());
};

// 2. Suspendre un utilisateur par ID
export const suspendUserById = (id) => {
  return axios.put(`${apiUrl}/admin/suspend/id/${id}`, {}, getAuthHeaders());
};

// 3. Supprimer un utilisateur par ID
export const deleteUserById = (id) => {
  return axios.delete(`${apiUrl}/admin/supprimer_utilisateur/id/${id}`, getAuthHeaders());
};

// 4. Restaurer un utilisateur suspendu par ID
export const restoreUserById = (id) => {
  return axios.put(`${apiUrl}/admin/unsuspend/id/${id}`, {}, getAuthHeaders());
};

// 5. Restaurer un utilisateur supprimé par ID
export const restoreDeletedUserById = (id) => {
  return axios.put(`${apiUrl}/admin/restore/id/${id}`, {}, getAuthHeaders());
};

// 6. Récupérer tous les utilisateurs supprimés (si nécessaire)
export const getDeletedUsers = () => {
  return axios.get(`${apiUrl}/admin/deleted-users`, getAuthHeaders());
};

// 7. Récupérer tous les utilisateurs suspendus (si nécessaire)
export const getSuspendedUsers = () => {
  return axios.get(`${apiUrl}/admin/suspendus`, getAuthHeaders());
};

// 8. Récupérer un utilisateur par ID
export const getUserById = (id) => {
  return axios.get(`${apiUrl}/admin/by-id/${id}`, getAuthHeaders());
};

// 9. Récupérer un utilisateur par email
export const getUserByEmail = (email) => {
  return axios.get(`${apiUrl}/admin/by_email/${email}`, getAuthHeaders());
};

// 10. Récupérer un utilisateur par username
export const getUserByUsername = (username) => {
  return axios.get(`${apiUrl}/admin/by-username/${username}`, getAuthHeaders());
};

// 11. Mise à jour des infos d’un utilisateur
export const updateUserInfos = (userId, userData) => {
  return axios.patch(`${apiUrl}/admin/update_user_infos/${userId}`, userData, getAuthHeaders());
};

// =============================
// ==== FONCTIONS POUR ADMIN CATEGORIE ===
// =============================

// Create Categorie

export const createCategorie = (categorieData) => {
  return axios.post(`${apiUrl2}/categorie/create_pub_cat`, categorieData, getAuthHeaders());
};

// Recuperer les Categorie
export const getCategories = () => {
  return axios.get(`${apiUrl2}/categorie/get_all_pub_cat`, getAuthHeaders());
};
// Recuperer une Categorie par ID
export const getCategorieById = (id) => {
  return axios.get(`${apiUrl2}/categorie/get_pub_cat_by_id/${id}`, getAuthHeaders());
};
// Update Categorie
export const updateCategorie = (categorieId, categorieData) => {
  return axios.put(`${apiUrl2}/categorie/update_pub_cat_by_Id/${categorieId}`, categorieData, getAuthHeaders());
};

// Delete Categorie by ID
 
export const deleteCategorieById = (id) => {
  return axios.delete(`${apiUrl2}/categorie/delete_pub_cat/${id}`, getAuthHeaders());
};

// =============================
// ==== FONCTIONS POUR PUBLICATION ===
// =============================

// Create Publication
export const createPublication = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl2}/publication_admin/admin_create_publication`,
      formData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la publication :', error.response?.data || error.message);
    throw error;
  }
};



// Get All Publications
export const getAllPublications = () => {
  return axios.get(`${apiUrl2}/publication_admin/all`, getAuthHeaders());
};
// Get My Publications
export const getMyPublications = () => {
  const userId = localStorage.getItem('user_id'); // Assuming 'user_id' is stored in localStorage
  return axios.get(`${apiUrl2}/publication_admin/moi/${userId}`, getAuthHeaders());
};

// Update Publication
export const updatePublication = (id, formData) => {
  return axios.post(`${apiUrl2}/publication_admin/update_pub_by_id/${id}`, formData, {
    headers: {
      ...getAuthHeaders().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};
// Restorer une Publication
export const restorePublication = (id) => {
  return axios.put(`${apiUrl2}/publication_admin/restore_pub/{pub_id}/${id}`, {}, getAuthHeaders());
};
// Delete Publication
export const deletePublication = (id) => {
  return axios.delete(`${apiUrl2}/publication_admin/delete_pub/${id}`, getAuthHeaders());
};

// ==============================
// ==== FONCTIONS POUR ADMIN CHARTE ===
// ==============================

// Create Charte
export const createCharte = (data) => {
  return axios.post(`${apiUrl3}/manage_charte/create_charte`, data, getAuthHeaders());
};

// Get All Chartes
export const getAllChartes = () => {
  return axios.get(`${apiUrl3}/manage_charte/get_all_charte`, getAuthHeaders());
};

// Get Charte By ID
export const getCharteById = (id) => {
  return axios.get(`${apiUrl3}/manage_charte/get_charte_by_id/${id}`, getAuthHeaders());
};

// Update Charte
export const updateCharte = (id, data) => {
  return axios.put(`${apiUrl3}/manage_charte/update_charte/${id}`, data, getAuthHeaders());
};

// Delete Charte
export const deleteCharte = (id) => {
  return axios.delete(`${apiUrl3}/manage_charte/delete_charte/${id}`, getAuthHeaders());
};


// =============================
// ==== FONCTIONS POUR ADMIN APROPOS ===
// =============================

// Create Apropos
export const createApropos = (aproposData) => {
  return axios.post(`${apiUrl1}/create_a_propos`, aproposData, getAuthHeaders());
};

// Get All Apropos
export const getAllApropos = () => {
  return axios.get(`${apiUrl1}/get_all_a_propos`, getAuthHeaders());
};

// Get Apropos By ID
export const getAproposById = (id) => {
  return axios.get(`${apiUrl1}/get_a_propos_by/${id}`, getAuthHeaders());
};

// Update Apropos
export const updateApropos = (id, aproposData) => {
  return axios.put(`${apiUrl1}/update_a_propos/${id}`, aproposData, getAuthHeaders());
};

// Activate Apropos
export const activateApropos = (id) => {
  return axios.put(`${apiUrl1}/activate_a_propos/${id}`, {}, getAuthHeaders());
};

// Deactivate Apropos
export const deactivateApropos = (id) => {
  return axios.put(`${apiUrl1}/desactivate_a_propos/${id}`, {}, getAuthHeaders());
};

// Delete Apropos
export const deleteApropos = (id) => {
  return axios.delete(`${apiUrl1}/delete_a_propos/${id}`, getAuthHeaders());
};

// Get Active Apropos
export const getActiveApropos = () => {
  return axios.get(`${apiUrl1}/actif`, getAuthHeaders());
};


// ====================================
// ==== AUTHENTIFICATION =============
// ====================================
// Inscription d'un nouvel utilisateur
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userData);

    const confirmationToken = response.data?.token_confirmation_email;
    if (confirmationToken) {
      console.log('Token de confirmation reçu :', confirmationToken);

      // ✅ Vérifie automatiquement le compte après inscription
      await axios.post(`${apiUrl}/auth/verify`, null, {
        params: { token: confirmationToken },
      });
      console.log('Compte vérifié avec succès après inscription');
    } else {
      console.warn('Aucun token de confirmation reçu.');
    }

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (loginInput, password) => {
  const isEmail = loginInput.includes('@')
  const url = isEmail
    ? `${apiUrl}/auth/login_with_email`
    : `${apiUrl}/auth/login_with_username`

  const formData = new FormData()
  formData.append('grant_type', 'password')
  formData.append('username', loginInput)
  formData.append('password', password)
  formData.append('scope', '')
  formData.append('client_id', 'string')
  formData.append('client_secret', 'string')

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const data = response.data

    localStorage.setItem('access_token', data.access_token)

    console.log('Connexion réussie :', data)

    return data // Laisse le composant décider de la redirection

  } catch (error) {
    console.error('Erreur lors de la connexion :', error.response?.data || error.message)
    throw error
  }
}

// Récupérer le token d'authentification
export const getAuthToken = () => {
  return localStorage.getItem('access_token')
;
};
// Récupérer le rôle de l'utilisateur
export const getUserRole = () => {
  return localStorage.getItem('role');
};

export const logoutUser = () => {
  localStorage.clear();
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  return axios.get(`${apiUrl}/auth/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

