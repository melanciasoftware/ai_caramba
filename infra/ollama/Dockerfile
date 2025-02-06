FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /opt/ollama

WORKDIR /opt/ollama

RUN apt update && apt install -y curl

RUN curl -fsSL https://ollama.com/install.sh | sh

#RUN ollama serve && sleep 10 && ollama pull deepseek-r1:1.5b

RUN echo '#!/bin/bash\n \
ollama serve&\n \
sleep 10\n \
ollama pull cas/daredevil-8b-abliterated-dpomix.i1\n \
kill $(jobs -p)' > /tmp/setup.sh && chmod +x /tmp/setup.sh && /tmp/setup.sh

EXPOSE 11434

CMD ["ollama", "serve"]