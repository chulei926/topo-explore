import request from "../utils/request";

export function auth(data: any) {
    return request({
        url: `/topo/auth`,
        method: 'post',
        data: data
    })
}
