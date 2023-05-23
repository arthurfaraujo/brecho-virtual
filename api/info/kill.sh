#!/bin/bash

# forçar o fechamento do servidor através do kill
retorno=$(lsof -i :3000 | grep -E "node")

KILL=${retorno:4:10}
kill $KILL
