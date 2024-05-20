# Stage 1: Build the app
FROM node:18-slim AS build

WORKDIR /app

#  Takes argument from docker build statement
ARG BACKEND_URL

# Check BACKEND_URL value
RUN echo "The BACKEND_URL ARG value is $BACKEND_URL"

# Create .env file based on ARG
# Note that .env file must be created before executing yarn build command !!
RUN echo "VITE_BASE_URL=$BACKEND_URL" >> .env

# Copy package.json, yarn.lock, and tsconfig.json etc. for dependencies
COPY package.json yarn.lock tsconfig.json tsconfig.node.json postcss.config.js tailwind.config.js vite.config.ts index.html ./

RUN yarn install

# Copy the TypeScript source files
COPY src /app/src
COPY public /app/public

# Build TypeScript files
RUN yarn build



# Stage 2: Create a production-ready image
FROM node:18-slim AS production

WORKDIR /app

# Copy only the build artifacts from the previous stage
COPY --from=build /app/dist /app/dist

RUN yarn global add serve

# Command to start your app when the container is run
CMD ["serve", "-l", "5000", "-s", "dist"]

# to build and run the container, use commands below:
# docker build -t dw-ui:latest --build-arg BACKEND_URL=https://stag.dw.planetsurf.id .
# docker run -d -p 5000:5000 dw-ui <-- without environment variables