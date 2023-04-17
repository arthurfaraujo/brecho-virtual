#!/bin/bash

# forçar o fechamento do servidor através do kill
lsof -i :8080 > retorno

RETORNO=$(grep -E "node" retorno)
KILL=${RETORNO:5:9}
kill $KILL
