# Reusable Slow Changing Dimension 2

**Slowly Changing Dimension**

A slowly changing dimension in data warehousing is a dimension which contains relatively static data which can change slowly but unpredictably, rather than according to a regular schedule.

**Slowly Changing Dimension Type 2**

Row versioning , Track changes as version records with current flag & active dates and other metadata. 

**Example Use case**

THE source table for SCD2 is a staging table that follows **append only** and gets it's data everyday from a source 'dataform_scd.source_data'(as below). The unique key combination for this table is data_source and account_number
![image](https://user-images.githubusercontent.com/48508718/194395428-5d291eff-e8eb-4e2c-9462-e5c27838b584.png)

The data from the source table is appended to `dataform_scd.source_data_scd_updates` The unique key combination for this table is data_source, account_number and updated_at. As mentioned above and for this use case the `dataform_scd.source_data_scd_updates` is the source for our SCD2 process. Even though we are not doing any calculations in this use case, the `dataform_scd.source_data_scd_updates` stands for the staging table in a real world scenario which would have data in usable format.
![image](https://user-images.githubusercontent.com/48508718/194400484-40ea182e-0047-4ba3-9e9d-9f98854cfff8.png)


