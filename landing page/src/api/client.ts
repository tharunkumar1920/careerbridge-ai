export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export interface ApiError {
  status: number;
  message: string;
}

export interface BackendHealth {
  online: boolean;
  message: string;
  latencyMs?: number;
}

class ApiClient {
  private getHeaders(isFormData = false): HeadersInit {
    const headers: Record<string, string> = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    const token = localStorage.getItem('skilllink_token') || localStorage.getItem('careerbridge_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      let errorMsg = `Request failed with status ${res.status}`;
      try {
        const body = await res.json();
        errorMsg = body.detail || body.message || errorMsg;
      } catch {
        // quiet fallback
      }
      throw { status: res.status, message: errorMsg } as ApiError;
    }
    return res.json() as Promise<T>;
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse<T>(res);
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(res);
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(res);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      credentials: 'include',
    });
    return this.handleResponse<T>(res);
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(true),
      credentials: 'include',
      body: formData,
    });
    return this.handleResponse<T>(res);
  }

  async checkHealth(): Promise<BackendHealth> {
    const start = performance.now();
    try {
      // Determine root health endpoint (e.g. http://127.0.0.1:8000/health)
      const rootUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, '');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch(`${rootUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      const latencyMs = Math.round(performance.now() - start);
      if (res.ok) {
        return { online: true, message: 'AI Engine Online', latencyMs };
      }
      return { online: false, message: `Status ${res.status}`, latencyMs };
    } catch {
      return { online: false, message: 'Offline (run start_backend.bat)' };
    }
  }
}

export const api = new ApiClient();
