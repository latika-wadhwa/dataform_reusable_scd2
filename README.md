# Reusable Slow Changing Dimension Type 2

**Slowly Changing Dimension**

A slowly changing dimension in data warehousing is a dimension which contains relatively static data which can change slowly but unpredictably, rather than according to a regular schedule.

**Slowly Changing Dimension Type 2**

Row versioning , Track changes as version records with current flag & active dates and other metadata. 

**Example Use case**

THE source table for SCD2 is a staging table that follows **append only** and gets it's data everyday from a source 'dataform_scd.source_data'(as below). The unique key combination for this table is data_source and account_number
![image](https://user-images.githubusercontent.com/48508718/194395428-5d291eff-e8eb-4e2c-9462-e5c27838b584.png)

The data from the source table is appended to `dataform_scd.source_data_scd_updates` The unique key combination for this table is data_source, account_number and updated_at. As mentioned above and for this use case the `dataform_scd.source_data_scd_updates` is the source for our SCD2 process. Even though we are not doing any calculations in this use case, the `dataform_scd.source_data_scd_updates` stands for the staging table in a real world scenario which would have data in usable format.
![image](https://user-images.githubusercontent.com/48508718/194400484-40ea182e-0047-4ba3-9e9d-9f98854cfff8.png)

**Input Parameter**

The following variables can be set to default or over written in dataform run command.

      "src_database":"latika-experiments",                      -- Source Table Database Name
      "src_schema":"dataform_scd",                              -- Source Table Schema Name
      "src_table":"source_data_scd_updates",                    -- Source Table Name
      "target_database":"latika-experiments",                   -- Target Table Database Name
      "target_schema":"dataform_scd",                           -- Target Table Schema Name
      "target_table":"source_data_scd_final",                   -- Target Table Name
      "target_hash_unique_col_name":"hash_unique",              -- Target Table Hash of Unique Value Column name
      "target_hash_non_unique_col_name":"hash_non_unique",      -- Target Table Hash of Non Unique Value Column name
      "executionDate": "2022-09-30",                            -- The date from which the data needs to be captured from. For instance if we need data for 2022-10-06 the execution date would be 2022-10-05 
      "timestampfield": "updated_at",                           -- The timestamp column name that records the load date/time of the data
      "start_from_column_name": "eff_date",                     -- The start date of from a record is valid
      "start_at_column_name": "exp_date",                       -- The end date of from a record is valid
      "stagingSchema":"dataform_staging"                        -- Staging schema

**Flowchart**

![image](https://user-images.githubusercontent.com/48508718/194404612-619e5bad-ea08-4d24-bc81-c2c137c359c4.png)

One additional thing to note here is that we are using an internal metadata table (like Information Schema) but would just have the primary keys of each tables(as below). For use cases where this is not valud we can pass the unique values via variables.

![image](https://user-images.githubusercontent.com/48508718/194410020-07bca06f-25a9-496c-af32-9664fb64f6c4.png)


**Run Command**

The only variables that we want to overwrite are mentioned in **dataform run** command rest everything takes in the default value set in the dataform.json file
 
dataform run --vars=src_schema=dataform_scd,target_schema=dataform_scd,executionDate=2022-10-05

**Results**

![image](https://user-images.githubusercontent.com/48508718/194407994-6ded950e-16b2-4bf1-93fa-716ab1c8390f.png)





