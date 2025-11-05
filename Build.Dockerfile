FROM maven:3.9.6-eclipse-temurin-11

RUN apt update
RUN apt install -y inotify-tools