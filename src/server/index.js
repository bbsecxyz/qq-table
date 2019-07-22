
const Koa = require("koa");
const KoaRouter = require("koa-router");
const KoaStatic = require("koa-static");
const MSSQL = require("mssql");
const colors = require("colors");
const fs = require("fs");

//服务端端口
const serverPort = 10241;
//数据库连接配置信息
const config = require("../../db.json");

//404中间件
function hold404 (ctx, next) {
    let code = 404;
    ctx.status = code;
    ctx.body = {
        code: code,
        data: null,
        msg: "资源不存在",
    };
}

//500中间件
function setCtx500 (ctx) {
    let code = 500;
    ctx.status = code;
    ctx.body = {
        code: code,
        data: null,
        msg: "服务器内部错误",
    };   
}

//记录每一次请求信息到日志文件的中间件
function holdAll (ctx, next) {
    let path = ctx.path;
    let time = (new Date()).toLocaleString();
    let ip = ctx.ip;
    fs.appendFile("log.txt", `${ ip } ${ time } ${ path }\r\n`, err => { });
    return next();
}

//主函数
async function main () {
    try {
        let pool = await MSSQL.connect(config);
        let app = new Koa();
        let router = new KoaRouter();

        //根据QQ号查询关系图接口
        router.get("/api/qq/:num", async (ctx, next) => {
            try {
                let qqNum = Number(ctx.params.num);
                let result = await pool.request()
                                .input("QQNum", MSSQL.Int, qqNum)
                                .execute("queryByQQNum");
                let code = 200;
                ctx.status = code;
                ctx.body = {
                    code: code,
                    data: {
                        member: result.recordsets[0],
                        group: result.recordsets[1],
                        link: result.recordsets[2],
                    },
                    msg: "查询成功",
                };
            }
            catch (e) {
                setCtx500(ctx);   
            }
        });

        //根据QQ号二次迭代查询关系图接口
        router.get("/api/qqext/:num", async (ctx, next) => {
            try {
                let qqNum = Number(ctx.params.num);
                let result = await pool.request()
                                .input("QQNum", MSSQL.Int, qqNum)
                                .execute("queryByQQNumExt");
                let code = 200;
                ctx.status = code;
                ctx.body = {
                    code: code,
                    data: {
                        member: result.recordsets[0],
                        group: result.recordsets[1],
                        link: result.recordsets[2],
                    },
                    msg: "查询成功",
                };
            }
            catch (e) {
                setCtx500(ctx);
            }
        });

        //根据群号查询关系图接口
        router.get("/api/group/:num", async (ctx, next) => {
            try {
                let groupNum = Number(ctx.params.num);
                let result = await pool.request()
                                .input("groupNum", MSSQL.Int, groupNum)
                                .execute("queryByGroupNum");
                let code = 200;
                ctx.status = code;
                ctx.body = {
                    code: code,
                    data: {
                        member: result.recordsets[0],
                        group: result.recordsets[1],
                        link: result.recordsets[2],
                    },
                    msg: "查询成功",
                };
            }
            catch (e) {
                setCtx500(ctx);
            }
        });

        //QQ信息表查询接口
        router.get("/api/qqtable/:num", async (ctx, next) => {
            try {
                let qqNum = Number(ctx.params.num);
                let result = await pool.request()
                                .input("qqNum", MSSQL.Int, qqNum)
                                .execute("queryTableByQQNum");
                let code = 200;
                ctx.status = code;
                ctx.body = {
                    code: code,
                    data: result.recordsets[0],
                    msg: "查询成功",
                };
            }
            catch (e) {
                setCtx500(ctx);       
            }
        });

        //群信息表查询接口
        router.get("/api/grouptable/:num", async (ctx, next) => {
            try {
                let groupNum = Number(ctx.params.num);
                let result = await pool.request()
                                .input("groupNum", MSSQL.Int, groupNum)
                                .execute("queryTableByGroupNum");
                let code = 200;
                ctx.status = code;
                ctx.body = {
                    code: code,
                    data: {
                        group: result.recordsets[0],
                        member: result.recordsets[1],
                    },
                    msg: "查询成功",
                };
            }
            catch (e) {
                setCtx500(ctx);
            }
        });

        app
            .use(KoaStatic(__dirname + "/www"))
            .use(holdAll)
            .use(router.routes())
            .use(hold404);

        app.listen(serverPort);
        console.log(`服务已经启动，工作在 ${ serverPort } 端口...`.green);
    }
    catch (e) {
        console.error(e.message);
    }
}

main();