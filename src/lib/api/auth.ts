import client from './client';

export interface AuthArgs {
	username: string;
	password: string;
}

export interface AuthResponse {
	_id: string;
	username: string;
}

export async function login(payload: AuthArgs) {
	const response = await client.post<AuthResponse>(
		'/api/auth/login',
		payload,
	);
	return response;
}

export async function register(payload: AuthArgs) {
	const response = await client.post<AuthResponse>(
		'/api/auth/register',
		payload,
	);
	return response;
}

export async function check() {
	const response = await client.get<AuthResponse>('/api/auth/check');
	return response;
}

export async function logout() {
	const response = await client.post('/api/auth/logout');
	return response;
}
