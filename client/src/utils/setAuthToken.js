import axios from 'axios'

const setAuthToken = ({
    token,
    token_admin
}) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else if (token_admin) {
        axios.defaults.headers.common['x-auth-token-admin'] = token_admin;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        delete axios.defaults.headers.common['x-auth-token-admin'];
    }
};

export default setAuthToken;