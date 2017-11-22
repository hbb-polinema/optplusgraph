#!/bin/bash

# by habibieeddien

# server bottle
xterm -e python bottle_server.py &

# backend server Node C/C++
xterm -e node backend.js &

# development watching TS file changed
xterm -e npm run webpack &