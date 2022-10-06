

// # Copyright 2020 Google LLC
// #
// # Licensed under the Apache License, Version 2.0 (the "License");
// # you may not use this file except in compliance with the License.
// # You may obtain a copy of the License at
// #
// #      http://www.apache.org/licenses/LICENSE-2.0
// #
// # Unless required by applicable law or agreed to in writing, software
// # distributed under the License is distributed on an "AS IS" BASIS,
// # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// # See the License for the specific language governing permissions and
// # limitations under the License.


function mergeScript(source,target) {
    return `
  """
  MERGE  ${target} as T
  USING (SELECT *,
   TO_BASE64(md5(IFNULL(NULLIF(UPPER(TRIM(CAST(CONCAT(%s)AS STRING))),''),'^^'))) as hash_src_unique, 
    TO_BASE64(md5(IFNULL(NULLIF(UPPER(TRIM(CAST(CONCAT(%s)AS STRING))),''),'^^'))) as hash_src_nonunique
  FROM ${(source)}
  where ${dataform.projectConfig.vars.timestampfield} > cast("${dataform.projectConfig.vars.executionDate}" as Date)) S
  ON   T.${dataform.projectConfig.vars.target_hash_unique_col_name}  =  S.hash_src_unique
      AND T.${dataform.projectConfig.vars.target_hash_non_unique_col_name} = S.hash_src_nonunique   
      AND T.${dataform.projectConfig.vars.end_at_column_name} IS NULL  
  WHEN NOT MATCHED BY SOURCE AND t.${dataform.projectConfig.vars.end_at_column_name} is null THEN
  UPDATE 
  SET t.${dataform.projectConfig.vars.end_at_column_name} = 
          case 
              when t.${dataform.projectConfig.vars.end_at_column_name} is NULL then
          (select max(${dataform.projectConfig.vars.timestampfield}) from ${(source)})
              else t.${dataform.projectConfig.vars.end_at_column_name}
          end   
  WHEN NOT MATCHED BY TARGET THEN
    INSERT(	
  %s,%s,${dataform.projectConfig.vars.timestampfield},${dataform.projectConfig.vars.start_from_column_name},${dataform.projectConfig.vars.start_at_column_name} )
    VALUES(%s, %s,hash_src_unique,hash_src_nonunique,${dataform.projectConfig.vars.timestampfield},${dataform.projectConfig.vars.timestampfield},null)
     """ `;
  }
  
  module.exports = { mergeScript };
  