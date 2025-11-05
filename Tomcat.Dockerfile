FROM maven:3.9.6-eclipse-temurin-11 AS builder

COPY . /src
WORKDIR /src

# RUN mvn test

RUN /src/build-dev.sh

FROM tomcat:9.0-jdk11 AS runtime

# Only copy the final release from the build stage
COPY --from=builder /src/target/gazetteer.war  /usr/local/tomcat/webapps/gazetteer.war
