import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Vérifier si l'utilisateur est connecté
export const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
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

// 1. Récupérer tous les utilisateurs
export const getUsers = () => {
  return axios.get(`${apiUrl}/admin/`);
};

// 2. Suspendre un utilisateur par ID
export const suspendUserById = (id) => {
  return axios.put(`${apiUrl}/admin/suspend/id/${id}`);
};

// 3. Supprimer un utilisateur par ID
export const deleteUserById = (id) => {
  return axios.delete(`${apiUrl}/admin/supprimer_utilisateur/id/${id}`);
};

// 4. Restaurer un utilisateur suspendu par ID
export const restoreUserById = (id) => {
  return axios.put(`${apiUrl}/admin/unsuspend/id/${id}`);
};

// 5. Restaurer un utilisateur supprimé par ID
export const restoreDeletedUserById = (id) => {
  return axios.put(`${apiUrl}/admin/restore/id/${id}`);
};

// 6. Récupérer tous les utilisateurs supprimés
export const getDeletedUsers = () => {
  return axios.get(`${apiUrl}/admin/deleted-users`);
};

// 7. Récupérer tous les utilisateurs suspendus
export const getSuspendedUsers = () => {
  return axios.get(`${apiUrl}/admin/suspendus`);
};

// 8. Récupérer un utilisateur par ID
export const getUserById = (id) => {
  return axios.get(`${apiUrl}/admin/by-id/${id}`);
};

// 9. Récupérer un utilisateur par email
export const getUserByEmail = (email) => {
  return axios.get(`${apiUrl}/admin/by_email/${email}`);
};

// 10. Récupérer un utilisateur par username
export const getUserByUsername = (username) => {
  return axios.get(`${apiUrl}/admin/by-username/${username}`);
};

// 11. Mise à jour des informations d'un utilisateur par ID
export const updateUserInfos = (userId, userData) => {
  return axios.patch(`${apiUrl}/admin/update_user_infos/${userId}`, userData);
};

// ====================================
// ==== AUTHENTIFICATION =============
// ====================================

// Inscription d'un nouvel utilisateur
export const registerUser = (userData) => {
  return axios.post(`${apiUrl}/auth/register`, userData);
};

// Connexion d'un utilisateur (email ou username détecté automatiquement)
export const loginUser = async (loginInput, password) => {
  const isEmail = loginInput.includes('@');
  const url = isEmail
    ? `${apiUrl}/auth/login_with_email`
    : `${apiUrl}/auth/login_with_username`;

  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('username', loginInput);
  formData.append('password', password);
  formData.append('scope', '');
  formData.append('client_id', 'string');        // à modifier si nécessaire
  formData.append('client_secret', 'string');    // à modifier si nécessaire

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Connexion réussie :', response.data);

    // Vérification du rôle utilisateur
    const user = response.data.user;
    const role = user?.role || response.data.role;

    if (!role) {
      console.error('❌ Aucun rôle reçu du serveur.');
    } else {
      console.log('✅ Rôle utilisateur :', role);
    }

    return response.data;

  } catch (error) {
    console.error('Erreur lors de la connexion :', error.response?.data || error.message);
    throw error;
  }
};

// Récupérer le token d'authentification
export const getAuthToken = () => {
  return localStorage.getItem('token');
};
// Récupérer le rôle de l'utilisateur
export const getUserRole = () => {
  return localStorage.getItem('role');
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  return axios.get(`${apiUrl}/auth/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
