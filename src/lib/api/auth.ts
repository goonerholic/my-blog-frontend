import client from './client';

// interface FormInput {
// 	username: string;
// 	password: string;
// }

export interface UserInfo {
	_id: string;
	username: string;
}

export async function login<FormInput, UserInfo>(payload: FormInput) {
	const response = await client.post<UserInfo>('/api/auth/login', payload);
	return response.data;
}

export async function register<FormInput, UserInfo>(payload: FormInput) {
	const response = await client.post<UserInfo>('/api/auth/register', payload);
	return response.data;
}

export async function check<UserInfo>() {
	const response = await client.get<UserInfo>('/api/auth/check');
	return response.data;
}

export async function logout() {
	const response = await client.post('/api/auth/logout');
	return response;
}
