
<style scoped>
    .app {
        width: 100%;
        height: 100%;
    }

    .myHeader {
        background-color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .myHeader span {
        font-size: 22px;
        color: white;
    }

    .searchInput {
        width: 400px;
    }
</style>

<style>
    html, body {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
    }
</style>




<template>
    <el-container class="app">
        <el-header class="myHeader">
            <span>QQ群数据库查询</span>
            <el-input class="searchInput" :placeholder="autoPlaceholder" v-model="searchNum">
                <el-select v-model="searchType" slot="prepend">
                    <el-option label="QQ号" value="qq"></el-option>
                    <el-option label="群号" value="group"></el-option>
                </el-select>
                <el-button @click="handleSearchClick" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-header>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                searchNum: "",
                searchType: "qq",
            };
        },
        watch: {
            searchType (nv) {
                this.searchNum = "";
            },
        },
        computed: {
            autoPlaceholder () {
                if (this.searchType == "qq") {
                    return "请输入QQ号进行查找";
                }
                else if (this.searchType == "group") {
                    return "请输入群号进行查找";
                }
                else {
                    return "";
                }
            },
        },
        methods: {
            handleSearchClick () {
                if (this.searchNum.trim()) {
                    if (this.searchType == "qq") {
                        this.$router.push(`/qqtable/${ this.searchNum }`);
                    }
                    else if (this.searchType == "group") {
                        this.$router.push(`/grouptable/${ this.searchNum }`);
                    }
                }
                else {
                    this.$message({
                        type: "warning",
                        message: "请输入搜索信息！",
                    });
                }
            },
        },
        mounted () {

        }
    };
</script>
