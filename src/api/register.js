import axios from 'axios'

function getPhoneCode(data){
    return axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data: data, //传入的data
         withCredentials:true,
    })
}

export default getPhoneCode