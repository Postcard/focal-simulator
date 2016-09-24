FROM node:6.6.0

MAINTAINER benoit@postcardgroup.com

ENV WEB_SRC ./
ENV WEB_SRVPROJ /srv

# install node modules
ADD package.json /tmp/package.json
RUN cd /tmp && JOBS=MAX  npm install --unsafe-perm
RUN mkdir -p $WEB_SRVPROJ && cp -a /tmp/node_modules $WEB_SRVPROJ

# Define working directory
WORKDIR $WEB_SRVPROJ

# Copy application source code to SRCDIR
ADD . $WEB_SRVPROJ

ENV PORT 80

EXPOSE 80

CMD ["npm", "start"]