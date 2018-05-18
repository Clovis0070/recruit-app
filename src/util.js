// 此文件专门定义 用户跳转地址的逻辑

export function getRedirectPath({type, avatar}) {
    // 根据用户信息，返回跳转地址

    let url = (type === 'boss') ? '/boss': '/genius';

    if (!avatar) {      // 根据是否有头像判断用户信息是否要完善，需要完善则跳转到info页面
        url += 'info';
    }
    return url;
}