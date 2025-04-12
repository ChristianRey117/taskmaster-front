const API_BASE_URL = "http://localhost:3000";

const handleRequest = (url: string, options: any) => {
  const token = localStorage.getItem("token");
  const headers = new Headers(options?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_BASE_URL}${url}`, { ...options, headers });
};

const handleResponse = async (response: any) => {
  const data = await response;
  if (!data.ok) {
    if (data.status === 401) {
      window.location.href = "/";
      throw new Error("Unauthorized");
    }
  }
  return data.json();
};

const get = (url: string, options: any) =>
  handleResponse(handleRequest(url, { ...options, method: "GET" }));
const post = (url: string, data: any, options: any) =>
  handleResponse(
    handleRequest(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", ...options?.headers },
    })
  );
const put = (url: string, data: any, options: any) =>
  handleResponse(
    handleRequest(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json", ...options?.headers },
    })
  );
const del = (url: string, options: any) =>
  handleResponse(handleRequest(url, { ...options, method: "DELETE" }));

export { get, post, put, del };
