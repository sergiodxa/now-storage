FROM mhart/alpine-node
WORKDIR /usr/src
ARG NOW_TOKEN
ARG NOW_TEAM
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn test --coverage && mv ./coverage/lcov-report /public
