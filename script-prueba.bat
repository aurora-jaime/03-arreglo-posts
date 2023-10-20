echo "PRUEBA DE PETICIONES DEL SERVIDOR WEB DE POSTEOS"
echo "curl -X POST, DATOS VÁLIDOS"
curl -X POST -H "Content-Type: application/json" -d "{\"title\": \"foo\", \"content\": \"bar\", \"author\": \"foo321\"}" http://localhost:4000/posts
echo "curl http://localhost:4000/posts"
curl http://localhost:4000/posts
echo "curl -X POST, DATOS NO VALIDOS: TITULO FALTANTE"
curl -X POST -H "Content-Type: application/json" -d "{\"content\": \"bar\", \"author\": \"foo321\"}" http://localhost:4000/posts
echo "curl -X POST, DATOS NO VALIDOS: TITULO VACIO"
curl -X POST -H "Content-Type: application/json" -d "{\"title\": \"\", \"content\": \"bar\", \"author\": \"foo321\"}" http://localhost:4000/posts
echo "curl -X POST, DATOS NO VALIDOS: TITULO CON TRES ESPACIOS EN BLANCO"
curl -X POST -H "Content-Type: application/json" -d "{\"title\": \"   \", \"content\": \"bar\", \"author\": \"foo321\"}" http://localhost:4000/posts
