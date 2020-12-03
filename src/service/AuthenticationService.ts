import axios, {AxiosResponse} from 'axios';
import {UserCredentials} from "../model/UserCredentials";

const SESSION_API_BASE_URL = 'http://localhost:8081/session'; //TODO use env specific URLs
const SESSION_USER_NAME = 'authenticatedUser'
const SESSION_JWT = 'jwt';

class AuthenticationService {

	init(): void {
		this.registerAxiosInterceptors();
	}

	login(user: UserCredentials) : Promise<AxiosResponse> {
		return axios.post(SESSION_API_BASE_URL + '/login', JSON.stringify(user));
	}

	registerLogin(username: string, token: string): void {
		sessionStorage.setItem(SESSION_USER_NAME, username);
		sessionStorage.setItem(SESSION_JWT, token);
		this.registerAxiosInterceptors();
	}

	private registerAxiosInterceptors() {
		axios.interceptors.request.use(
			(config) => {
				if (this.isUserLoggedIn()) {
					config.headers.authorization = sessionStorage.getItem(SESSION_JWT);
				}
				return config;
			}
		)
	}

	logout(): void {
		sessionStorage.removeItem(SESSION_JWT);
		sessionStorage.removeItem(SESSION_USER_NAME);
	}

	isUserLoggedIn(): boolean {
		return sessionStorage.getItem(SESSION_JWT) !== null
	}
}

export default new AuthenticationService();
