# StackHackToDo

## Setup

1) Clone the repository from https://github.com/mmbhatk/StackHack_ToDo

2) Enter the repository using the "cd" command

3) Type the command "npm install"

4) On one terminal: nx serve todos

5) On another terminal: nx serve api

6) Setup MongoDB locally using the following command:

curl -X POST \ http://localhost:3333/api/users \ -H 'cache-control: no-cache' \ -H 'content-type: application/json' \ -d '{ "userid": "044021" }'
