
import { Client } from "faunadb";
import { query } from "faunadb";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { limparNomeAulas, sortByOrder } from "./functions";

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
    try {
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
            let data
            if (!!matchValue) {
                data = await fauna.query(
                    q.Map(
                        q.Paginate(
                            q.Match(
                                eval(matchFunction), matchValue
                            ),
                            paginacao
                        ),
                        q.Lambda("doc", eval(lambdaFunction))
                    )
                )
            } else {
                data = await fauna.query(
                    q.Map(
                        q.Paginate(
                            q.Match(
                                eval(matchFunction)
                            ),
                            paginacao
                        ),
                        q.Lambda("doc", eval(lambdaFunction))
                    )
                )

            }

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
    } catch (e) {
        console.log(e.message)
        console.log("erro em paginateIndex")
        return false
    }
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
                    data: { ...data, modulos: [], publicado: false }

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
export const getRefData = async ({ key, collection, ref, returnInfo, dataRefOnly, dataOnly, refOnly }) => {
    if (dataOnly) returnInfo == "data"
    if (refOnly) returnInfo == "ref"
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
    retorno = dataRefOnly ? { refFauna: getData.ref.id, ...getData.data } : returnInfo === "data" ? getData.data : returnInfo === "ref" ? getData.ref.id : getData
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

export const deleteByRef = async ({ key, email, pageSize, collection, ref, returnInfo }) => {
    if (!key) {
        key = await validarTenantUsuario({ email, pageSize, getKey: true })
    }
    let q = query
    let fauna = key
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

const ordenarModulos = (curso) => {
    let newModulos = curso.modulos.map(modulo => {
        modulo.aulas = sortByOrder(modulo.aulas)
        return modulo
    })
    let sortedNewModulos = sortByOrder({value:newModulos})
    return sortedNewModulos
}

export const montarCurso = async (cursoRecebido) => {
    try {
        const key = process.env.FAUNA_MAIN_KEY
        let modulosAdicionar = cursoRecebido.modulos.filter(modulo => typeof modulo === "object" && !modulo.refFauna)
        let cursoFormatado = { ...cursoRecebido, modulos: [] }
        const oldModulos = await paginateIndex({ key, index: "modulos_by_slugCurso", matchValue: cursoRecebido.slug, dataRefOnly: true })
        const oldModulosMontados = []
        await Promise.all(
            await oldModulos.map(async oldModulo => {
                oldModulo.aulas = limparNomeAulas(oldModulo.aulas)
                let newOldModuloAulas = []
                await Promise.all(
                    oldModulo.aulas.map(async oldAulaRef => {
                        newOldModuloAulas.push(await getRefData({ key, collection: "aulas", ref: oldAulaRef, dataRefOnly: true }))
                    })
                )
                oldModulo.aulas = newOldModuloAulas
                oldModulosMontados.push(oldModulo)
            })
        )
        cursoFormatado.modulos = oldModulosMontados
        cursoFormatado.modulos.push(...modulosAdicionar)
        let cursoFormatadoOrdenado = ordenarModulos(cursoFormatado)
        return cursoFormatadoOrdenado
    } catch (e) {
        console.log("Erro ao montar curso, msg:", e.message)
        return cursoRecebido
    }
}

export const montarCursoPorSlug = async (slugCurso) => {
    return await montarCurso(await paginateIndex({ key: process.env.FAUNA_MAIN_KEY, index: "cursos_by_slug", matchValue: slugCurso, dataRefOnly: true }).then(resp => { return resp[0] ?? [] }))
}

export const modulosDeletar = async ({ modulos, deletarAulas }) => {
    const key = process.env.FAUNA_MAIN_KEY
    await Promise.all(
        modulos.map(async (modulo) => {
            if (deletarAulas) {
                console.log("Deletar Aulas")
                await Promise.all(
                    modulo.aulas.map(async aula => {
                        await deleteByRef({ key, collection: "aulas", ref: aula.refFauna })
                    })
                )
            }
            await deleteByRef({ key, collection: "modulos", ref: modulo.refFauna })
        })
    )
}
