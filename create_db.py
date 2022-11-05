#!/usr/bin/env python3
import json

db = []

with open('verified.csv', 'rt') as fp:
	for line in fp:
		if ',' not in line:
			continue

		screen_name = line.split(',')[1]
		db.append(screen_name.lower())

# make unique
db = list(set(db))

with open('ext/db.js', 'w+t') as fp:
	fp.write('const veryfied_users = %s;' % json.dumps(db))