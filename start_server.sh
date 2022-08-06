sed 's@{_ACCESS_KEY_ID_}@'"$ENV_ACCESS_KEY"'@' ./PROJETO/src/pages/Status.js > ./PROJETO/src/pages/Status2 &&
sed 's@{_SECRET_ACCESS_KEY_}@'"$ENV_SECRET_KEY"'@' ./PROJETO/src/pages/Status2 > ./PROJETO/src/pages/Status3
sed 's@{_INST_NUM_}@'"$ENV_INSTANCES"'@' ./PROJETO/src/pages/Status3 > ./PROJETO/src/pages/Status.js
rm ./PROJETO/src/pages/Status2 ./PROJETO/src/pages/Status3
cd ./PROJETO 
npm start