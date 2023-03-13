import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        })
        
    }
    
}
/* port postgres 5434 เป็น port ที่ run ใน docker container 
ถ้าเกิดปิด docker db ที่ใส่ไปจะหาย ถ้า 5432 = default ในเครื่อง ถ้าจะดูข้อมูลใน db ใช้ npx prisma studio */