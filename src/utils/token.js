//token保存
function saveToken(val,name='token'){
    window.localStorage.setItem(name,val)
}

//获取token 使用
function getToken(name='token'){
    return window.localStorage.getItem(name)
}

//删除token
function removeToken(name="token"){
    window.localStorage.removeItem(name)
}

export {saveToken,getToken,removeToken}