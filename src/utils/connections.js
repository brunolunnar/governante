
import { Client } from "faunadb";
import { query } from "faunadb";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export const paginateCollection = async ({ key, pageSize, collectionName, dataOnly }) => {
    let q = query
    let fauna = key
    let results = [];
    pageSize = pageSize ? pageSize : 25;
    let last = null;
    let paginacao = { size: pageSize };
    let hasMore = true;

    let lambdaFunction = "q.Get(q.Var('doc'))"
    if (!!dataOnly) {
        lambdaFunction = "q.Select(['data']," + lambdaFunction + ")"
    }
    if (typeof fauna === "string") {
        fauna = new Client({
            secret: fauna,
            domain: "db.us.fauna.com",
        });
    }

    while (hasMore) {
        let data = await fauna.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection(collectionName)), paginacao),
                q.Lambda("doc", eval(lambdaFunction))
            )
        );
        results.push(...data.data)
        last = data.after;
        if (data.data.length < pageSize || !last) {
            hasMore = false;
        }
        paginacao = { size: pageSize + pageSize, after: last };
    }
    return results
}
//matchValue = valor
//dataOnly = data
//refOnly = ref
//dataRefOnly = data e dentro do dara vai ter o ref
//
export const paginateIndex = async ({ key, pageSize, index, matchValue, dataOnly, refOnly, dataRefOnly, customSelect }) => {
    let q = query
    let fauna = key
    let results = [];
    pageSize = pageSize ? pageSize : 25;
    let last = null;
    let paginacao = { size: pageSize };
    let hasMore = true;
    let matchFunction = "q.Index('" + index + "')"
    let lambdaFunction = "q.Get(q.Var('doc'))"
    if (!!dataOnly) {
        lambdaFunction = "q.Select(['data']," + lambdaFunction + ")"
    }
    if (!!refOnly) {
        lambdaFunction = "q.Select(['ref','id']," + lambdaFunction + ")"
    }
    if (!!customSelect) {
        lambdaFunction = "q.Select(" + customSelect + "," + lambdaFunction + ")"
    }

    if (typeof fauna === "string") {
        fauna = new Client({
            secret: fauna,
            domain: "db.us.fauna.com",
        });
    }
    while (hasMore) {
        let data = await fauna.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        eval(matchFunction), !!matchValue && matchValue
                    ),
                    paginacao
                ),
                q.Lambda("doc", eval(lambdaFunction))
            )
        );
        if (dataRefOnly) {
            data.data.map(data => {
                results.push({
                    refFauna: data.ref.id,
                    ...data.data
                })
            })

        } else {
            results.push(...data.data)
        }
        last = data.after;
        if (data.data.length < pageSize || !last) {
            hasMore = false;
        }
        paginacao = { size: pageSize + pageSize, after: last };
    }
    return results;
}

export const createData = async ({ key, collection, data, returnInfo }) => {
    let q = query
    let fauna = key
    if (typeof fauna === "string") {
        fauna = new Client({
            secret: fauna,
            domain: "db.us.fauna.com",
        });
    }
    let retorno
    if (!!data) {
        let createData = await fauna.query(
            q.Create(
                q.Collection(collection),
                {
                    data: { ...data }
                },
            )
        )
        retorno = returnInfo === "data" ? createData.data : returnInfo === "ref" ? createData.ref.id : createData
    }
    return retorno;
}

export const updateRef = async ({ key, collection, ref, data, returnInfo }) => {
    let q = query
    let fauna = key
    if (typeof fauna === "string") {
        fauna = new Client({
            secret: fauna,
            domain: "db.us.fauna.com",
        });
    }
    let retorno
    if (!!data) {
        let updatedRef = await fauna.query(
            q.Update(
                q.Ref(q.Collection(collection), ref),
                {
                    data: data
                },
            )
        )
        retorno = returnInfo === "data" ? updatedRef.data : returnInfo === "ref" ? updatedRef.ref.id : updatedRef
    }
    return retorno;
}
export const getRefData = async ({ key, collection, ref, returnInfo }) => {
    let q = query
    let fauna = key
    if (typeof fauna === "string") {
        fauna = new Client({
            secret: fauna,
            domain: "db.us.fauna.com",
        });
    }
    let retorno
    let getData = await fauna.query(
        q.Get(
            q.Ref(q.Collection(collection), ref)
        )
    )
    retorno = returnInfo === "data" ? getData.data : returnInfo === "ref" ? getData.ref.id : getData
    return retorno;
}

export const validarTenantUsuario = async ({ email, pageSize, getKey }) => {
    // onlyUserInfo vem como true quando validarTenantUsuario() é chamado dentro de getUserInfo()
    // onlyUserInfo = !!onlyUserInfo ?? false
    if (!pageSize) {
        pageSize = 50
    }
    const conectarBDClient = new Client({
        secret: process.env.FAUNADB_MAIN_KEY,
        domain: "db.us.fauna.com",
    });
    const getUserData = await paginateIndex({ key: conectarBDClient, pageSize: pageSize, index: "users_by_email", matchValue: email, dataOnly: true })

    // Pegando somente as informações do primeiro encontrado
    // *-> posteriormente, se necessário, adicionar suporte para múltiplos dados
    let userData = getUserData[0]

    if (!userData) {
        return false
    }

    // if(onlyUserInfo){
    //     return userData
    // }

    // Pegando somente o id do primeiro tenant guardado para fins de mvp
    // *-> posteriormente, se necessário, adicionar suporte para múltiplos tenants
    let tenantId = userData.tenants[0]
    const getTenantData = await paginateIndex({ key: conectarBDClient, pageSize: pageSize, index: "tenants_by_id", matchValue: tenantId, dataOnly: true })

    let validTenant = !!getTenantData[0]
    let retorno = !!getKey ? getTenantData[0].FAUNADB_KEY.default : validTenant
    console.log(retorno)
    console.log("retorno")
    return retorno
}



export const validarComissão = async (comissao) => {
    // console.log(comissao)
    // console.log("comissao")
    return true
}

export const getUserInfo = async ({ email, pageSize }) => {
    const tenantKey = await validarTenantUsuario({ email, pageSize, getKey: true })
    const perms = await paginateIndex({ key: tenantKey, index: "users_by_email", matchValue: email, dataRefOnly: true }).then(resp => { return resp[0].perms ?? [] })
    return perms
}

export const deleteByRef = async ({ email, pageSize, collection, ref, returnInfo }) => {
    const tenantKey = await validarTenantUsuario({ email, pageSize, getKey: true })
    let q = query
    let fauna = tenantKey
    if (typeof fauna === "string") {
        fauna = new Client({
            secret: fauna,
            domain: "db.us.fauna.com",
        });
    }
    let retorno
    let deleteRef = await fauna.query(q.Delete(q.Ref(q.Collection(collection), ref)))

    retorno = returnInfo === "data" ? deleteRef.data : returnInfo === "ref" ? deleteRef.ref.id : deleteRef
    return retorno;

}


