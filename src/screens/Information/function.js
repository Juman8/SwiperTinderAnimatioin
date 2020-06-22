const callApi = (url) => {
    let options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 30000
    };

    return new Promise((resolve, reject)=> {
        fetch(url, options).then((response)=>{
            try{
                return response.json()
            }
            catch(err){
                reject({ err: 2, msg: 'Lỗi kết nối, không thể lấy dữ liệu bây giờ, xin vui lòng thử lại' });
            }
        }).then((data)=> {
            resolve(data)
        }).catch((err)=> {
            reject({ err: 1, msg: 'Check internet connection' });
        })
    })
}

const getProfileUser = async(getData) => {
    try{
        let data = await callApi('https://randomuser.me/api/0.4/?randomapi')
        if(data.results&&data.results.length>0){
            return getData(data.results[0].user)
        }
        getData()
    }catch(err){
        getData()

    }

}

export {getProfileUser}

