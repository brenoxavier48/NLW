import { Request, Response, response } from 'express';
import knex from '../database/connection';

class PointsController{

    async insert(req: Request, resp: Response){

        const info = req.body;
        const trx = await knex.transaction();
     
        const insertedIds = await trx('points').insert({
             image:      info.image,
             name:       info.name,
             email:      info.email,
             whatsapp:   info.whatsapp,
             latitude:   info.latitude,
             longitude:  info.longitude,
             city:       info.city,
             uf:         info.uf
        });

        const point_id = insertedIds[0];

        const pointItems = info.items.map( (item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
        
        await trx('point_items').insert(pointItems)
                    .catch((e)=>{
                        console.log
                    });
                    
        await trx.commit();

        return resp.json({
            id: point_id,
            ...info
        })
    }

    async index(req: Request, resp: Response){

        const { uf, city, items } = req.query;
        
        const parsedItems = String(items)
            .split(',')
            .map( item => Number(item.trim()))
    
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('points.city', String(city))
            .where('points.uf', String(uf))
            .distinct()
            .select('points.*');
        
        return resp.json(points);
    }

    async show(req: Request, resp: Response){

        const { id } = req.params;

        try{

            const point = await knex('points').where('id', id).first();
    
            if(!point) return resp.status(400).json({message: 'Point not found!'});
    
            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', id)
                .select('items.name');
    
            return resp.json({point, items})
        }
        catch(e){
            console.log(e)
        }
    }
}

export default PointsController;