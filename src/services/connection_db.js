import { Client } from "faunadb";
import { paginateIndex } from "@/utils/connections";

export async function ConnectionFauna({email}){
     
  let user = await paginateIndex({
    key: process.env.FAUNA_MAIN_KEY,
    index: "users_by_email",
    matchValue: email,
    dataOnly: true,
  });
  let tenantId = user[0].tenants[0];
  let tenant = await paginateIndex({
    key: process.env.FAUNA_MAIN_KEY,
    index: "tenants_by_id",
    matchValue: tenantId,
    dataOnly: true,
  });
  let keyTenant = tenant[0].key;
  let dbTenant = await paginateIndex({
    key: keyTenant,
    index: "users_by_email",
    matchValue:email,
    dataRefOnly:true
  });

  return  keyTenant
}