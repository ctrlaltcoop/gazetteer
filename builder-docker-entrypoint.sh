#! /bin/bash
/src/build-dev.sh

inotifywait -r -m -e modify /src/src | while read file_path file_event file_name; do 
    echo ${file_path}${file_name} event: ${file_event}
    /src/build-dev.sh
done 
