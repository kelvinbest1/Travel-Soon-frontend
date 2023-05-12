const BASE_URL = "/api/trips";

export function getAll() {
    return fetch(BASE_URL).then(res => res.json());
}
// export function getAll(user) {
//     console.log({user})
//     return fetch(`/api/users/${user._id}`).then(res => res.json());
// }

export function create(trip) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(trip)
    }).then(res => res.json());
}
