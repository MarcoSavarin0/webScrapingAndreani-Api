
# Costo de envios Andreani (Web Scraping)




## Tecnologias usadas
- NodeJS
- Express
- Puppeteer
- Docker



## Endpoints

#### Get all items

```http
  GET /costos?cpDestino=1001&valor=5000
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cpDestino` | `number` | **Required**. Codigo postal donde se va enviar el producto |
| `valor` | `valor` | **Required**. Es el precio del producto que se envia |

###### El codigo postal de donde sale el envio esta hardcodeado, lo mismo que el tamaño del paquete, que esta como paquete chico




###
#### Pagina en la cual trabaje para conseguir los precio
[![andreani](https://th.bing.com/th/id/OIP.2JJDKyHyXP9NSsCFw2EivwAAAA?w=200&h=67&rs=1&pid=ImgDetMain)](https://pymes.andreani.com/cotizador)



## Run Locally

Clone the project

```bash
  git clonehttps://github.com/MarcoSavarin0/webScrapingAndreani-Api
```

Go to the project directory

```bash
  cd webScrapingAndreani-Api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
#### con docker : 

crear imagen
```bash
docker build -t apiAndreani .
```
correr container
```bash
docker run -p 3000:3000 apiAndreani
```


