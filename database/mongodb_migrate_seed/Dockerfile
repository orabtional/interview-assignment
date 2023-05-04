FROM mongo:4

COPY init.json /init.json

CMD mongoimport --uri mongodb://mongodbUser:somePass@mongodb_migrate:27017/todoDB?authSource=admin --drop --collection users --type json --file /init.json --jsonArray