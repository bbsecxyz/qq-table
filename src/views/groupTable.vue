<!--局部样式-->
<style scoped>
    .headImg {
        width: 64px;
        height: 64px;
    }

    .pageLink {
        color: rgb(76, 162, 233);
        text-decoration: none;
    }

    .groupTable {
        margin-top: 8px;
        margin-bottom: 30px;
    }

    .memberTable {
        margin-top: 8px;
    }

    .tableLabel {
        font-size: 18px;
    }
</style>

<!--局部覆盖样式-->
<style>
</style>

<template>
    <div class="viewGroupTable">
        <label class="tableLabel">群信息：</label>
        <el-table
            v-loading="loading"
            class="groupTable"
            stripe
            border
            :data="groupList">
            <el-table-column>
                <template slot-scope="scope">
                    <img class="headImg" :src="`/groupimg/${ searchNum }/${ searchNum }/100`" />
                </template>
            </el-table-column>
            <el-table-column
                prop="groupTitle"
                label="群名称">
            </el-table-column>
            <el-table-column
                label="群号">
                <template slot-scope="scope">
                    {{ searchNum }}
                </template>
            </el-table-column>
            <el-table-column
                prop="groupSummary"
                label="群简介">
            </el-table-column>
            <el-table-column
                prop="groupClass"
                label="groupClass">
            </el-table-column>
            <el-table-column
                prop="groupMast"
                label="groupMast">
            </el-table-column>
        </el-table>
        <label class="tableLabel">群成员：</label>
        <el-table
            v-loading="loading"
            class="memberTable"
            stripe
            border
            :data="memberList">
            <el-table-column>
                <template slot-scope="scope">
                    <img class="headImg" :src="`/qqimg?dst_uin=${ scope.row.memberQQNum }&spec=100`" />
                </template>
            </el-table-column>
            <el-table-column
                label="成员昵称">
                <template slot-scope="scope">
                    <a class="pageLink" :href="`/#/qqtable/${ scope.row.memberQQNum }`">{{ scope.row.memberNick }}</a>
                </template>
            </el-table-column>
            <el-table-column
                label="QQ号">
                <template slot-scope="scope">
                    <a class="pageLink" :href="`/#/qqtable/${ scope.row.memberQQNum }`">{{ scope.row.memberQQNum }}</a>
                </template>
            </el-table-column>
            <el-table-column
                label="群内性别">
                <template slot-scope="scope">
                    {{ scope.row.memberGender == "0" ? "男" : "女" }}
                </template>
            </el-table-column>
            <el-table-column
                prop="memberAge"
                label="群内年龄">
            </el-table-column>
            <el-table-column
                prop="memberAuth"
                label="群内权限">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import api from "@/api";

    export default {
        name: "viewGroupTable",
        props: {

        },
        data () {
            return {
                //#region 页面对象
                //#endregion

                //#region 页面内容绑定数据
                    searchNum: "",
                    groupList: [],
                    memberList: [],
                    loading: false,
                //#endregion

                //#region 页面样式绑定数据
                //#endregion
            };
        },
        watch: {
            "$route": "handleRouteChange",
        },
        computed: {
            //#region 常量计算属性
            //#endregion

            //#region 数据转换计算属性
            //#endregion
            
            //#region 样式计算属性
            //#endregion
        },
        methods: {
            //#region 页面事件方法
                handleRouteChange (nv) {
                    this.searchNum = this.$route.params.num;
                    this.b_updateTable();
                },
            //#endregion

            //#region 业务逻辑方法
                async b_updateTable () {
                    this.loading = true;
                    try {
                        let result = await api.queryGroupTable(this.searchNum);
                        if (result) {
                            this.groupList = result.group;
                            this.memberList = result.member;
                        }
                        this.loading = false;
                    }
                    catch (e) {
                        this.loading = false;
                    }
                },
            //#endregion

            //#region 接口访问方法
            //#endregion

            //#region 数据转换方法
            //#endregion

            //#region 自动样式方法
            //#endregion

            //#region 其他方法
            //#endregion
        },
        created () {
            this.searchNum = this.$route.params.num;
            this.b_updateTable();
        },
        mounted () {

        },
        components: {

        },
    };
</script>