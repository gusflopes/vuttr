FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package*.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]

CMD ["./wait-for-it.sh", "tcp:postgres", "--strict", "--timeout=300", "--", "yarn", "dev"]
# CMD ["yarn", "dev"]
