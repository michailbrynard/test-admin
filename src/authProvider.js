import Rehive from 'rehive';

var config = {
    apiVersion: 3, 
    storageMethod: "session",
    apiToken: "authenticationTokenHere"
};

const rehive = new Rehive(config);

export default {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        return rehive.auth.login({
            user: username,
            company: "test_company_1",
            password: password
        }).then(user => {
            console.log('success')
            sessionStorage.setItem('user', JSON.stringify(user));
            return user;
        }, err => {
            return err;
        })
    },
    // called when the user clicks on the logout button
    logout: () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        return sessionStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return sessionStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};