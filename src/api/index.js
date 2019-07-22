
import Http from "../http";

async function api_queryQQGraph (qqNum) {
    let reqUrl = `/api/qq/${ qqNum }`;
    let response = await Http.fetch(reqUrl);
    console.log(response);
}

async function api_queryQQExtGraph (qqNum) {

}

async function api_queryGroupGraph (groupNum) {

}

async function api_queryQQTable (qqNum) {
    let reqUrl = `/api/qqtable/${ qqNum }`;
    let response = await Http.fetch(reqUrl);
    if (response.code == 200) {
        return response.data;
    }
    else {
        return [];
    }
}

async function api_queryGroupTable (groupNum) {
    let reqUrl = `/api/grouptable/${ groupNum }`;
    let response = await Http.fetch(reqUrl);
    if (response.code == 200) {
        return response.data;
    }
    else {
        return null;
    }
}

export const queryQQGraph = api_queryQQGraph;
export const queryQQExtGraph = api_queryQQExtGraph;
export const queryGroupGraph = api_queryGroupGraph;
export const queryQQTable = api_queryQQTable;
export const queryGroupTable = api_queryGroupTable;

export default {
    queryQQGraph: api_queryQQGraph,
    queryQQExtGraph: api_queryQQExtGraph,
    queryGroupGraph: api_queryGroupGraph,
    queryQQTable: api_queryQQTable,
    queryGroupTable: api_queryGroupTable,
};
