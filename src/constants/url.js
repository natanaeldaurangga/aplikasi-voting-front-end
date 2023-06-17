export const RESOURCE_URL = "http://localhost:8000";

export const base_url = (path) => {
    if (path[0] === "/") {
        return RESOURCE_URL + path;
    } else {
        return RESOURCE_URL + "/" + path;
    }
}

export const img_url = (path) => {
    let arrPath = path.split('/');
    return IMAGE_URL + "/" + arrPath[arrPath.length - 1];
}

export const AUTH_URL = RESOURCE_URL + "/api/login";
export const IMAGE_URL = RESOURCE_URL + "/storage/candidate-images";
