# Matches the AWS Lambda Node.js 20 runtime @sparticuz/chromium targets.
FROM public.ecr.aws/lambda/nodejs:20

WORKDIR /var/task

# Trick @sparticuz/chromium's runtime detection into extracting al2023.tar.br
# (which ships libnss3.so et al.) and setting LD_LIBRARY_PATH. Without this
# the browser dies with `libnss3.so: cannot open shared object file`.
ENV AWS_EXECUTION_ENV=AWS_Lambda_nodejs20.x

# Install only package manifests first so `docker build` can reuse the
# node_modules layer when source changes but deps don't.
COPY package.json yarn.lock* ./
RUN npm install -g yarn && yarn install --production --frozen-lockfile || yarn install --production

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY index.js local-test.js ./

# Default command runs the smoke test. Override with `docker run ... node <file>`.
ENTRYPOINT []
CMD ["node", "local-test.js"]
