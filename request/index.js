let AjaxTimes = 0;
export const request=(params)=>{
    AjaxTimes++;
    //定义公共的url
    wx.showLoading({
        title: '加载中',
      })
    const baseUrl = 'https://api.zbztb.cn/api/public/v1'
    return new Promise((resolve,reject)=>{
        let request = wx.request({
            ...params,
            url:baseUrl + params.url,
            success:(result)=>{
              
                resolve(result.data.message)
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{
                AjaxTimes--;
               if( AjaxTimes == 0 ){
                wx.hideLoading()
               }
            }
        });
    })
}