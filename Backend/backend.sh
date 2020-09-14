#!/bin/sh

. /etc/profile.d/atlas_zone_bcn.sh

cd `dirname $0`

python3 backend.py