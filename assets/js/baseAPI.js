//注意：每次调用$.get（）或$.post（）或$.ajax（）的时候，
//会先调用ajaxprefilter这个函数
//在这个函数中,可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    console.log(options.url);
    //发起真正的Ajax请求之前,统一拼接请求的根路径
    //"根路径"要自己替换
    options.url = "根路径"+options.url
})