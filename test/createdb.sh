#!/bin/bash
mysql -u root --password=root  < schema.sql
mysql -u root --password=root  < data.sql
