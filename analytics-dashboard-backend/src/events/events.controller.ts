import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private eventService:EventsService){}

    @Post()
    async track(@Body() body:{url:string, referrer?:string, device:string}){
        return this.eventService.create(body);
    }

    @Get('summary')
    async summary(){
        return this.eventService.getSummary();
    }

}
