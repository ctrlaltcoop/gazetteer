FROM maven:3.9.6-eclipse-temurin-11

HEALTHCHECK --interval=5s --start-period=1s CMD test -e /src/.tomcat/gazetteer.war

RUN apt update
RUN apt install -y inotify-tools