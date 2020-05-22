export default class FetchAPI {
    static url = 'http://localhost:5000/api';
    
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const baseURL = 'http://localhost:5000/api';
        const url = baseURL + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
    
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser(username, password) {
        const response = await this.api(`/users`, 'GET', null, true, {username, password});
        console.log(response.status);

        if(response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api(`/users`, 'POST', user);
        console.log(response.status);

        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
              return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    async getCourses() {
        const response = await this.api('/courses', 'GET');
        console.log(response.status);

        if(response.status === 200 || 404) {
            return response.json().then(data => {
                const results = {
                    status: response.status,
                    data: data
                };
                return results;
            });
        } 
        else {
            throw new Error();
        }

    }

    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET');
        console.log(response.status);
        
        if (response.status === 200 || response.status === 404) {
            return response.json().then(data => {
                const results = {
                    status: response.status,
                    data: data
                };
                return results;
            });
        } 
        else {
            throw new Error();
        }
    }

    async createCourse(course, username, password) {
        const response = await this.api('/courses', 'POST', course, true, {username, password});
        console.log(response.status);

        if (response.status === 201) {
            return {
                status: response.status,
                location: response.headers.get('Location')
            };
        } else if (response.status === 400){
            return response.json().then(data => {
                const results = {
                    status: response.status,
                    message: data.message
                };
                return results;
            });
        } else if (response.status === 401) {
            return { status: response.status };
        } else {
            throw new Error();
        }
    }

    async updateCourse(id, updates, username, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', updates, true, {username, password});

        console.log(response.status);

        if (response.status === 204) {
            return {
                status: response.status,
                location: response.headers.get('Location')
            };
        } else if (response.status === 400){
            return response.json().then(data => {
                const results = {
                    status: response.status,
                    errors: data.errors
                };
                return results;
            });
        } else if (response.status === 401 || response.status === 403 || response.status === 404) {
            return { status: response.status };
        } else {
            throw new Error();
        }
    }

    async deleteCourse(id, username, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {username, password});
        console.log(response.status);

        if (response.status === 204) {
            return {
                status: response.status
            }
        } else if (response.status === 403 || response.status === 404) {
            return response.json().then(data => {
                const results = {
                    status: response.status,
                    message: data.message
                };
                return results;
            });
        } else {
            throw new Error();
        }

    }
}