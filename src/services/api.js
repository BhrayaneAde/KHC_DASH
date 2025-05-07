import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

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

// =============================
// ==== FONCTIONS POUR ADMIN ===
// =============================

// 1. Récupérer tous les utilisateurs
export const getUsers = () => {
  return axios.get(`${apiUrl}/admin`, getAuthHeaders());
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

// Connexion d'un utilisateur (email ou username détecté automatiquement)
export const loginUser = async (loginInput, password) => {
  const isEmail = loginInput.includes('@');
  const url = isEmail
    ? `${apiUrl}/auth/login_with_email`
    : `${apiUrl}/auth/login_with_username`;

  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('username', loginInput);  // Username ou email géré côté backend
  formData.append('password', password);
  formData.append('scope', '');
  formData.append('client_id', 'string');
  formData.append('client_secret', 'string');

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Sauvegarde cohérente du token dans localStorage
    localStorage.setItem('access_token', response.data.access_token);
    
    console.log('Connexion réussie :', response.data);
    return response.data;

  } catch (error) {
    console.error('Erreur lors de la connexion :', error.response?.data || error.message);
    throw error;
  }
};


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
  localStorage.removeItem('access_token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  return axios.get(`${apiUrl}/auth/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

