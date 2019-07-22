import Vue from 'vue';
import Router from 'vue-router';
import viewQQTable from "@/views/qqTable";
import viewGroupTable from "@/views/groupTable";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "viewQQTable",
            component: viewQQTable,
        },
        {
            path: "/qqtable/:num",
            name: "viewQQTable",
            component: viewQQTable,
        },
        {
            path: "/grouptable/:num",
            name: "viewGroupTable",
            component: viewGroupTable,
        },
    ]
})
