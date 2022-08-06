FROM debian:buster
RUN apt update
RUN apt install npm -y
COPY aws_dashboard_react ./PROJETO/
COPY start_server.sh .
WORKDIR PROJETO
RUN npm install -g
WORKDIR /
ENTRYPOINT ["bash","start_server.sh"]
