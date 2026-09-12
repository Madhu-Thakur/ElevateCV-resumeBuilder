const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = response.status;
    throw error;
  }

  return data;
};
 
export const registerUser = async (userData) => {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (userData) => {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getProfile = async () => {
  return request("/api/auth/profile", {
    method: "GET",
  });
};

export const createResume = async (resumeData) => {
  return request("/api/resumes", {
    method: "POST",
    body: JSON.stringify(resumeData),
  });
};

export const getResumes = async () => {
  return request("/api/resumes", {
    method: "GET",
  });
};

export const getResumeById = async (id) => {
  return request(`/api/resumes/${id}`, {
    method: "GET",
  });
};

export const updateResume = async (id, resumeData) => {
  return request(`/api/resumes/${id}`, {
    method: "PUT",
    body: JSON.stringify(resumeData),
  });
};

export const deleteResume = async (id) => {
  return request(`/api/resumes/${id}`, {
    method: "DELETE",
  });
};

 
export const generateSummary = async (payload) => {
  return request("/api/ai/summary", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};