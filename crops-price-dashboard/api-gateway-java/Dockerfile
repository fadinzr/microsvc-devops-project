# Stage 1: Build

FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy project files

COPY api-gateway/pom.xml .
COPY api-gateway/src ./src

# Download dependencies and build

RUN mvn dependency:go-offline
RUN mvn package -DskipTests

# Stage 2: Runtime

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy only the built jar from the builder stage

COPY --from=builder /app/target/api-gateway-0.0.1-SNAPSHOT.jar ./api-gateway.jar

# Expose port if needed (optional)

# EXPOSE 8080

CMD ["java", "-jar", "api-gateway.jar"]

