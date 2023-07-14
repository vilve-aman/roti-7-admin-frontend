import { processRoutes } from '@/admin-scripts/process';


const API_URL = 'https://consolidated-harneet-server-image-sgainltbaq-uc.a.run.app/'


const fetchDashboardData = () => {

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/admin/get_dashboard_data`)
            .then((res) => res.json())
            .then((res) => {
                resolve(res)
            })
            .catch((err) => { reject(err) })
    })

    // return routes -> routes is an array object []
}

const fetchRoutes = () => {
    console.log('fetchroutes called')
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/admin/get_latest_routes`)
            .then((res) => res.json())
            .then((res) => {
                resolve(processRoutes(res.routes))
                console.log(res.routes)
            })
            .catch((err) => { reject(err); console.log(err) })
    })

    // return routes -> routes is an array object []
}



const generateRoutes = (bandwidth) => {
    console.log(bandwidth)
    // const options = {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: {
    //         'Accept':'*/*',
    //         'Content-Type': '*/*',
    //     },
    //     body: JSON.stringify({
    //         "collId": "locationV2",
    //         "bandwidth": bandwidth
    //     })
    // }


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "collId": "locationV2",
        "bandwidth": bandwidth
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/admin/generate_maps`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.routes)
                resolve(processRoutes(res.routes))
            })
            .catch((err) => { reject(err) })
    })

    // return new Promise((res,rej)=>{

    // })
}


const fetchMapsMetaData = () => {

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/admin/get_maps_metadata`)
            .then((res) => res.json())
            .then((res) => {
                resolve(res)
            })
            .catch((err) => { reject(err) })
    })

    // return routes -> routes is an array object []
}



const adminlogin = (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/admin/login`, requestOptions)
            .then((res) => {
                if (res.status == 200) return res.json()
                else reject('Oops Some error Occured')
            })
            .then((res) => {
                // console.log(res)
                resolve(res)
            })
            .catch((err) => { reject(err) })
    })
}

export { fetchRoutes, generateRoutes, fetchDashboardData, fetchMapsMetaData, adminlogin }