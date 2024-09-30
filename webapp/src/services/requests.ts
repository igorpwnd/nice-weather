const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

class request {
    static async get<T>(url: string) {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Request Failed! Status: ${response.status}`);

        return await response.json() as T;
    }
}

export default request;
