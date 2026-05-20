import csv
COLUMNS = {
    'HANDLER_ID': 0, 'HANDLER_NAME': 4, 'ACTIVE_SITE': 11, 'OWNER_TYPE': 44, 'OPERATOR_TYPE': 47,
    'NAIC1': 49, 'TRANSFER_FACILITY': 64, 'RECYCLER': 65, 'OFF_SITE_RECEIPT': 69, 'UNIVWASTE': 70,
    'USED_OIL': 72, 'AS_FEDERALLY_REGULATED_TSDF': 74, 'COMMERCIAL_TSD': 81, 'OPERATING_TSDF': 101,
}

def is_target(row):
    active_site = row[COLUMNS['ACTIVE_SITE']].strip()
    if not (active_site and active_site.startswith('H')):
        return False
        
    off_site = row[COLUMNS['OFF_SITE_RECEIPT']].strip() == 'Y'
    comm_tsd = row[COLUMNS['COMMERCIAL_TSD']].strip() == 'Y'
    operating_tsdf = row[COLUMNS['OPERATING_TSDF']].strip().upper() == 'Y'
    
    is_receiver = off_site or comm_tsd or operating_tsdf
    if not is_receiver:
        return False
        
    naic = row[COLUMNS['NAIC1']].strip()
    naic_prefix = naic[:3] if naic else ''
    owner = row[COLUMNS['OWNER_TYPE']].strip()
    operator = row[COLUMNS['OPERATOR_TYPE']].strip()
    is_government = owner in ('M', 'C') or operator in ('M', 'C')
    
    transfer = row[COLUMNS['TRANSFER_FACILITY']].strip() == 'Y'
    recycler = row[COLUMNS['RECYCLER']].strip() == 'Y'
    handles_used_oil = 'Y' in row[COLUMNS['USED_OIL']].strip().upper()
    handles_univwaste = 'Y' in row[COLUMNS['UNIVWASTE']].strip().upper()
    
    is_waste_industry = naic_prefix in ('562', '924')
    is_specific_activity = transfer or recycler or handles_used_oil or handles_univwaste
    
    return is_waste_industry or is_government or is_specific_activity

count = 0
with open('../../HD_REPORTING/HD_REPORTING_0.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        if is_target(row):
            count += 1
print(f"Total target facilities in file 0: {count}")
