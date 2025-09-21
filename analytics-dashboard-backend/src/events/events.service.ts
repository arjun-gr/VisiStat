import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventRepo:Repository<Event>
    ){}

    async create(eventData:Partial<Event>){
        try {
        const event = this.eventRepo.create(eventData);
        return this.eventRepo.save(event);            
        } catch {
            return {statusCode:500, message:"Something went wrong"}
        }
    }

    async getSummary(){
        try{
        const totalVisits = await this.eventRepo.count();

        const dailyVisits = await this.eventRepo.createQueryBuilder('event')
            .select("DATE(event.created_at)", "date")
            .addSelect("COUNT(*)", "count")
            .groupBy("DATE(event.created_at)")
            .orderBy("date", "ASC")
            .getRawMany();

         const topPages = await this.eventRepo
            .createQueryBuilder('event')
            .select("event.url", "url")
            .addSelect("COUNT(*)", "count")
            .groupBy("event.url")
            .orderBy("count", "DESC")
            .limit(5)
            .getRawMany();

        const deviceStats = await this.eventRepo
            .createQueryBuilder('event')
            .select("event.device", "device")
            .addSelect("COUNT(*)", "count")
            .groupBy("event.device")
            .getRawMany();
        
        return { totalVisits, dailyVisits, topPages, deviceStats };
        }catch{
            return {statusCode:404, message:"Couldnt find the data"}
        }
    }
}
