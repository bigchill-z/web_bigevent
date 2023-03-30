$(function () {
    // 点击"去注册帐号"
    $("#link_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    // 点击"去登录"
    $("#link_login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })


    //自定义表单验证规则
    // 从layui中获取form对象
    var form = layui.form
    // 通过form.verify()函数自定义校验规则
    form.verify({
        //自定义叫做pwd的校验规则
        'pwd': [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        'repwd':function(value){
            //通过形参拿到的是重复密码的值
            //还需要拿到密码框的内容
            //然后进行相等的判断
            //如果不等,就return一个错误消息
            var pwd = $('.reg-box [name=password]').val()
            console.log(pwd);
            if(pwd!==value){
                return '两次密码不一致'
            }


        }

    })
    var layer = layui.layer
    //监听注册表单提交
    $('#form_reg').on('submit',function(e) {
        e.preventDefault();
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        //下面的路径不可用!!!只是演示
        $.post('url',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg("注册成功!请登录");
            // 转为登录表单
            $('#link_login').click();
        })
    })
    //监听登录表单提交
    $('#form_login'),submit(function(e) {
        e.preventDefault();
        $.ajax({
            url:'url',
            method: "POST",
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status!==0){
                    return layer.msg('登录失败!')
                }
                return layer.msg('登录成功!')
            //将登录成功得到的token字符串,保存至localStorage
            localStorage.setItem('token',res.token)
            //跳转到后台主页
            location.href = '/index.html'
            }

        })
    })

})
