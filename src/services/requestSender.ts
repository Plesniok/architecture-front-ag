import { ServiceResponse } from "../models/responseData";

class RequestSender {
    private static vikiDetectionHandlerHost = "localhost";
    private static vikiDetectionHandlerPort = 8081;
    private static baseUrl: string = `http://${this.vikiDetectionHandlerHost}:${this.vikiDetectionHandlerPort}/`;

    public static async get<T>(path: string, queryParams?: Record<string, any>, host?: string, port?: string): Promise<ServiceResponse<T> | null> {
        try {
            let url = RequestSender.baseUrl + path;

            if(host && port) {
                url = `http://${host}:${port}/${path}`
            }

            if (queryParams) {
                const queryString = Object.entries(queryParams)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                url += `?${queryString}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-access-token': localStorage.getItem('token') ?? ''
                }
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const responseData: ServiceResponse<T> = await response.json();

            return responseData;
        } catch (error) {
            console.error(`GET request failed: ${error}`);
            return null;
        }
    }

    public static async put<T>(path: string, body: any, queryParams?: Record<string, any>, host?: string, port?: string): Promise<ServiceResponse<T> | null> {
        try {
            let url = RequestSender.baseUrl + path;
    
            if(host && port) {
                url = `http://${host}:${port}/${path}`
            }
    
            if (queryParams) {
                const queryString = Object.entries(queryParams)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                url += `?${queryString}`;
            }
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-access-token': localStorage.getItem('token') ?? ''
                },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
    
            const responseData: ServiceResponse<T> = await response.json();
    
            return responseData;
        } catch (error) {
            console.error(`PUT request failed: ${error}`);
            return null;
        }
    }
    

    public static async post<T>(path: string, body: any, queryParams?: Record<string, any>, host?: string, port?: string): Promise<ServiceResponse<T> | null> {
        try {
            let url = RequestSender.baseUrl + path;
    
            if(host && port) {
                url = `http://${host}:${port}/${path}`
            }
    
            if (queryParams) {
                const queryString = Object.entries(queryParams)
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
                url += `?${queryString}`;
            }
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-access-token': localStorage.getItem('token') ?? ''
                },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
    
            const responseData: ServiceResponse<T> = await response.json();
    
            return responseData;
        } catch (error) {
            console.error(`POST request failed: ${error}`);
            return null;
        }
    }
}

export default RequestSender    