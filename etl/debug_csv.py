import csv
COLUMNS = {
    'HANDLER_ID': 0, 'HANDLER_NAME': 4, 'ACTIVE_SITE': 11, 'OWNER_TYPE': 44, 'OPERATOR_TYPE': 47,
    'NAIC1': 49, 'TRANSFER_FACILITY': 64, 'RECYCLER': 65, 'OFF_SITE_RECEIPT': 69, 'UNIVWASTE': 70,
    'USED_OIL': 72, 'AS_FEDERALLY_REGULATED_TSDF': 74, 'COMMERCIAL_TSD': 81, 'OPERATING_TSDF': 101,
}
with open('../../HD_REPORTING/HD_REPORTING_0.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        if row[0] in ["MAC300003555", "MAR000010959"]:
            print(f"--- {row[0]} ---")
            for k, v in COLUMNS.items():
                print(f"{k}: {row[v]}")
            
            naic = row[COLUMNS['NAIC1']].strip()
            naic_prefix = naic[:3] if naic else ''
            off_site = row[COLUMNS['OFF_SITE_RECEIPT']].strip()
            comm_tsd = row[COLUMNS['COMMERCIAL_TSD']].strip()
            owner = row[COLUMNS['OWNER_TYPE']].strip()
            operator = row[COLUMNS['OPERATOR_TYPE']].strip()
            recycler = row[COLUMNS['RECYCLER']].strip()
            transfer = row[COLUMNS['TRANSFER_FACILITY']].strip()
            univwaste = row[COLUMNS['UNIVWASTE']].strip()
            used_oil = row[COLUMNS['USED_OIL']].strip()
            
            print(f"is_comm_waste: {(naic_prefix == '562') and (off_site == 'Y' or comm_tsd == 'Y')}")
            is_government = owner in ('M', 'C') or operator in ('M', 'C')
            print(f"is_gov: {is_government}")
            print(f"gov_waste: {is_government and (transfer == 'Y' or (recycler == 'Y' and naic_prefix in ('562', '924', '')) or (used_oil != 'N' and used_oil != '') or univwaste == 'Y')}")
            print(f"is_spec_waste: {naic in ('562212', '562920')}")
            print(f"explicit_tsdf: {(comm_tsd == 'Y' or row[COLUMNS['OPERATING_TSDF']].strip().upper() == 'Y')}")
