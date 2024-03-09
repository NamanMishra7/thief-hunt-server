import { Express, Request, Response } from "express";

const express = require('express');
const morgan = require('morgan');

const app: Express = express();

const PORT = process.env.PORT || 4000;

import { fetchData, saveData } from "./helpers/utilityFunctions";

import { City } from "./models/City.model";
import { Vehicle } from "./models/Vehicle.model";

const fs = require('fs');
const cors = require("cors");

app.use(express.json());

app.use(morgan("dev"));

app.use(cors())

app.post('/api/city', async (req: Request, res: Response) => {
  try {
    const {city, knownAs, distance, description} = req.body;

    if (city == null || knownAs == null || distance == null || isNaN(distance)) {
      return res.status(400).send({ success: false, message: "invalid params" });
    }

    const newCity = new City(city, knownAs, distance, description);
    
    await newCity.save();

    res.send({ success: true, city: newCity });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get('/api/city/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (name == null) {
      return res.status(400).send({ success: false, message: "invalid params" });
    }

    const cities = await fetchData('city');

    const data = cities.find((el) => {
      return el.name === name;
    });
    
    if (data == null) {
      return res.send({ success: false, message: `city with name ${name} does not exists!` })
    }

    res.send({ success: true, city: data });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get('/api/cities', async (req: Request, res: Response) => {
  try {
    const cities = await fetchData('city');

    res.send({ success: true, cities: cities });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.put('/api/updateCity/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const { data } = req.body;

    if (data == null || data.name == null || data.knownAs == null || data.distance == null || isNaN(data.distance)) {
      return res.status(400).send({ success: false, message: "invalid params" });
    } 

    const cities = await fetchData('city');

    const idx = cities.findIndex(el => el.name === name);

    if (idx == -1) {
      return res.status(404).send({ success: false, message: `city with name ${name} does not exists!` })
    }

    cities[idx] = {
      uid: cities[idx].uid,
      name: data.name,
      knownAs: data.knownAs,
      distance: data.distance,
      description: data.description
    }

    const success = await saveData('city', cities);

    if (!success) {
      return res.status(500).send({ success: false, message: "server error!" })
    }

    res.send({ success: true, message: "city updated" });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.delete('/api/city/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (name == null) {
      return res.status(400).send({ success: false, message: "invalid params" });
    }

    const cities = await fetchData('city');

    const idx = cities.findIndex(el => el.name === name);
    
    if (idx == -1) {
      return res.status(404).send({ success: false, message: `city with name ${name} does not exists!` })
    }

    cities.splice(idx, 1);

    const success = await saveData('city', cities);

    if (!success) {
      return res.status(500).send({ success: false, message: "server error!" })
    }

    res.send({ success: true, message: "city deleted" });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.post('/api/vehicle', async (req: Request, res: Response) => {
  try {
    const {name, range, count} = req.body;

    if (name == null || range == null || isNaN(range) || count == null || isNaN(count)) {
      return res.status(400).send({ success: false, message: "invalid params" });
    }

    const newVehicle = new Vehicle(name, range, count);
    
    await newVehicle.save();

    res.send({ success: true, vehicle: newVehicle });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get('/api/vehicle/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (name == null) {
      return res.status(400).send({ success: false, message: "invalid params" });
    }

    const vehicles = await fetchData('vehicle');

    const data = vehicles.find((el) => {
      return el.name === name;
    });
    
    if (data == null) {
      return res.send({ success: false, message: `vehicle with name ${name} does not exists!` })
    }

    res.send({ success: true, vehicle: data });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.put('/api/vehicle/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const { data } = req.body;

    if (data == null || data.name == null || data.range == null || isNaN(data.range) || data.count == null || isNaN(data.count)) {
      return res.status(400).send({ success: false, message: "invalid params" });
    } 

    const vehicles = await fetchData('vehicle');

    const idx = vehicles.findIndex(el => el.name === name);

    if (idx == -1) {
      return res.status(404).send({ success: false, message: `vehicle with name ${name} does not exists!` })
    }

    vehicles[idx] = {
      uid: vehicles[idx].uid,
      name: data.name,
      range: data.range,
      count: data.count
    }

    const success = await saveData('vehicle', vehicles);

    if (!success) {
      return res.status(500).send({ success: false, message: "server error!" })
    }

    res.send({ success: true, message: "vehicle updated" });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.delete('/api/vehicle/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (name == null) {
      return res.status(400).send({ success: false, message: "invalid params" });
    }

    const vehicles = await fetchData('vehicle');

    const idx = vehicles.findIndex(el => el.name === name);
    
    if (idx == -1) {
      return res.status(404).send({ success: false, message: `vehicle with name ${name} does not exists!` })
    }

    vehicles.splice(idx, 1);

    const success = await saveData('vehicle', vehicles);

    if (!success) {
      return res.status(500).send({ success: false, message: "server error!" })
    }

    res.send({ success: true, message: "vehicle deleted" });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.get('/api/gameState', async (req: Request, res: Response) => {
  try {
    const data = await fs.promises.readFile('data/gameState.json');
    res.send({ success: true, gameState: JSON.parse(data) });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.put('/api/gameState', async (req: Request, res: Response) => {
  try {
    const { gameState } = req.body;
    await fs.promises.writeFile('data/gameState.json', JSON.stringify(gameState));
    res.send({ success: true, gameState: gameState });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.post('/api/reset', async (req: Request, res: Response) => {
  try {
    const gameState = {};
    const cities = await fetchData('city');
    const vehicles = await fetchData('vehicle');
    gameState["cities"] = cities.map((city) => {
      return {
        searched: false,
        searchedBy: 0,
        ...city
      }
    });
    gameState["vehicles"] = vehicles;
    const criminalPos = Math.ceil(Math.random() * cities.length);
    await fs.promises.writeFile('data/gameState.json', JSON.stringify({
      gameState,
      criminalPos: criminalPos,
      state: 0
    }));
    res.send({ success: true, message: "game reset!" })
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.post('/api/searchCriminal', async (req: Request, res: Response) => {
  try {
    const choices = req.body.choices;
    const data = await fs.promises.readFile('data/gameState.json');
    const gameState = JSON.parse(data);

    const criminalPos = gameState.criminalPos - 1;
    let cop = 0;
    for (let choice of Object.values(choices)) {
      cop++;
      let idx = gameState.gameState.cities.findIndex(el => el.uid == choice["city"]);
      if (idx == criminalPos) {
        return res.send({ success: true, criminalFound: true, cop: cop });
      }
    }
    
    res.send({ success: true, criminalFound: false })
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

app.listen(PORT, () => { 
    console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
  }
);