#!/bin/bash
# This script builds two .war artifacts for production and test respectively.
#
# Prerequisites:
# * Java: Successfully built with: java-11-openjdk.
# * Apache Maven: Successfully built with Apache Maven: 3.9.9.
# * Make sure the user running the build can write in '/var/log/gazetteeer'.
# * Make sure that the `gazetteer-configs` directory is put next to the `gazetteer` repository directory.
#
# The results of this script will be copied to `./builds/<date the script was run>/`.

set -e

DIST_DIR=./builds

TODAY=$(date '+%Y-%m-%d')

mkdir -p $DIST_DIR/$TODAY

mkdir -p /var/log/gazetteer

cp src/main/resources/log4j2.xml.template src/main/resources/log4j2.xml 
cp src/main/webapp/WEB-INF/web.xml.template src/main/webapp/WEB-INF/web.xml
cp src/main/webapp/WEB-INF/config.properties.template src/main/webapp/WEB-INF/config.properties
cp src/main/webapp/WEB-INF/mail.properties.template src/main/webapp/WEB-INF/mail.properties
sed -i 's|/var/log/gazetteer/gazetteer.log|logs/gazetteer.log|g' src/main/resources/log4j2.xml

mvn clean package -Dmaven.test.skip=true
