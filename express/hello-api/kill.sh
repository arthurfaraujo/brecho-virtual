#!/bin/bash

# forçar o fechamento do servidor através do kill
retorno=$(lsof -i :8080)

RETORNO=$(grep -E "node" $retorno)
KILL=${RETORNO:5:9}
kill $KILL
