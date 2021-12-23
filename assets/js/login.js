$(function() {
    // 点击"注册账号"链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
            // alert('111')
    })

    // 点击"去登陆"链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取对象
    var form = layui.form
    var layer = layui.layer

    // 自定义验证规则
    form.verify({
        // 密码限制
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 注册密码校验
        repwd: function(value) {
            var val = $('.reg-box [name=password]').val()
            if (value !== val) {
                return '密码不一致！'
            }
        }
    })

    // 注册提交按钮监听事件
    $('#form_reg').on('submit', function(e) {
        // 1，阻止默认的提交请求
        e.preventDefault()
            // 2，发起ajax的post请求
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg('注册成功！')
                }
            })
    })

    // 登录事件
    $('#form_login').on('submit', function(e) {
        // 1，阻止默认的提交请求
        e.preventDefault()
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            methor: 'post',
            // 快速获取表单内的数据
            data: $(this).serialize(),
            succuss: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！！')
                }
                layer.msg('登录成功！！！')

                // 将登录成功得到的token字符串， 保存到localstorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                localtion.href = '/index.html'
            }
        })
    })

})