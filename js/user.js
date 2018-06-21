$(function() {
  var page = 1;
  var pageSize = 10;
    //页面加载，需要渲染
    render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        var html = template("tpl", info);
        $("tbody").html(html);
        // 分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本
          currentPage: page, //指定当前页数
          totalPages: Math.ceil(info.total / info.size), //设置总页数
          size: "small", //调整分页控件的尺寸
          onPageClicked: function(a, b, c, p) {
            //当点击分页的按钮的时候，会触发
            page = p;
            //重新渲染
            render();
          }
        });
      }
    });
  };


    //三、启用与禁用功能
    // 1.给启用或者禁用注册点击事件
    // 2.点击确定的时候，发送ajax请求，启用或者禁用该用户
    // 3.点击确定的时候，发送ajax请求，启用或者禁用该用户
    // 4.成功的时候，隐藏模态框，重新渲染
    $("tbody").on("click", ".btn", function () {
        // console.log(111);
        // 显示模态框
        $("#userModal").modal("show");
        // 获取每一个tr的id
        var id = $(this).parent().data("id");
        // 取决于点的按钮的颜色
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        console.log(id ,isDelete);
        
        //注意解除以前的事件
        $(".btn_updata").off().on("click", function () {
            // 发送ajax请求，看接口文档
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (info) {
                    console.log(info);
                    //关闭模态框
                    $("#userModal").modal("hide")
                }
            })
        })
    })

});
