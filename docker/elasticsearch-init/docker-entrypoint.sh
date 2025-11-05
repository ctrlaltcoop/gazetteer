#!/bin/bash

echo "ES Init..."
echo $ELASTICSEARCH_CONTAINER_NAME
sleep 5

until $(curl -o /dev/null -s --head --fail $ELASTICSEARCH_CONTAINER_NAME:9200); do
    echo "Waiting for ES to start..."
    sleep 5
done

echo "Pushing place template to ElasticSearch..."
curl http://$ELASTICSEARCH_CONTAINER_NAME:9200/_template/gazetteer_template -X PUT -H "Content-Type: application/json" -d "@/mappings/place_template.json"

echo "Create the index..."
curl -X PUT "http://$ELASTICSEARCH_CONTAINER_NAME:9200/gazetteer"