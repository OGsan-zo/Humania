// Model pour l'utilisateur (authentification)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string; // 'admin', 'rh', 'candidat'
  token?: string;
}

// Model pour la requête de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Model pour la réponse de login
export interface LoginResponse {
  user: User;
  token: string;
}
