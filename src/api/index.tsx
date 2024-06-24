const API = 'https://freetestapi.com/api/v1/students'

export default function fetchUser() {
    const data = fetch(API).then((response) => response.json());
    return data;
}