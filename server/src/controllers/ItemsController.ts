import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController{

    async index(req: Request, resp: Response){

        const items = await knex('items').select('*')
    
        const serializedItems = items.map( item => {
            return {
                id: item.id,
                name: item.name,
                image_url: `http://192.168.0.17:3333/uploads/${item.image}`,
            }
        })
        
        return resp.json(serializedItems);
    }
}

export default ItemsController;