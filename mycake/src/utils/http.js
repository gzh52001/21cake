// 封装ajax请求
// fetch（url,options）
const baseUrl = process.env.NODE_ENV ==='development' ? 'http://120.24.22.195:4099' : 'http://120.24.22.195:4099'
export async function request(url, data = {}, options = {}){
    url = baseUrl+url;
    if(options.method){
        options.method = options.method.toLowerCase();
    }
    if(options.method ==='get' || options.get === undefined){
        const params =[]
        for(const key in data){
            params.push(`${key}=${data[key]}`)
        }
        url = url+(url.includes('?') ? '&' : '?') + params.join('&')
    }else if(['post','put','patch'].includes(options.method)){
        data = JSON.stringify(data);
        options.headers['content-type']='application/json';
    }
    return await fetch(url,{
        ...options,
        data
    }).then(res=>res.json());
}
export function get(url,data,options){
    return request(url,data,options)
}
export function post(url,data,options={method:'post'}){
    return request(url,data,options)
}
export function remove(url,data,options={method:'delete'}){
    return request(url,data,options)
}
export function put(url,data,options={method:'put'}){
    return request(url,data,options)
}
export function patch(url,data,options={method:'patch'}){
    return request(url,data,options)
}
export default{
    request,
    get,
    post,
    put,
    patch,
    remove
}