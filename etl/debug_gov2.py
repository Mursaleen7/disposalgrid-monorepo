import csv
COLUMNS = {
    'HANDLER_ID': 0, 'HANDLER_NAME': 4, 'OWNER_TYPE': 44, 'NAIC1': 49,
    'TRANSFER_FACILITY': 64, 'RECYCLER': 65, 'OFF_SITE_RECEIPT': 69
}
found = 0
with open('../../HD_REPORTING/HD_REPORTING_0.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        owner = row[COLUMNS['OWNER_TYPE']].strip()
        transfer = row[COLUMNS['TRANSFER_FACILITY']].strip()
        recycler = row[COLUMNS['RECYCLER']].strip()
        off_site = row[COLUMNS['OFF_SITE_RECEIPT']].strip()
        naic = row[COLUMNS['NAIC1']].strip()
        
        if owner in ('M', 'C') and (naic.startswith('562') or naic.startswith('924')) and off_site == 'N':
            print(f"{row[0]} | {row[COLUMNS['HANDLER_NAME']]} | NAIC: {naic} | Trans: {transfer} | Rec: {recycler}")
            found += 1
            if found > 5:
                break
