import { Request, Response } from 'express'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// Interface para o typescript reconhecer o tipo de cada elemento
interface scheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController  {

    async index(request: Request, response: Response) {
        const filters = request.query;

        // "as string" é uma forma de dizer ao typescript que o "time" é uma string
        const subject = filters.subject as string; 
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // Caso um dos campos do filtro não esteja preenchido, será levantado um erro
        if ( !filters.week_day || !filters.subject || !filters.time ){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time); 

        const classes = await db('classes')
        .whereExists(function() {
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw(' `class_schedule`.`class_id` = `classes`.`id` ')
                .whereRaw(' `class_schedule`.`week_day` = ?? ', [Number(week_day)])
                .whereRaw(' `class_schedule`.`from` <= ?? ', [timeInMinutes] )
                .whereRaw(' `class_schedule`.`to` > ?? ', [timeInMinutes] )
        })
        .where('classes.subject', '=', subject) // Lista as matérias
        .join('users',  'classes.user_id', '=', 'users.id') // Une os dados do usuário 
        .select(['classes.*', 'users.*']) // Estão em um array pois serão selecionados TODOS os dados em cada tabela

        return response.json(classes);

    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        // O uso de transaction() faz com que todas as alterações no banco sejam feitas de uma só vez, e caso uma falhe, todas as outras alterações serão descartadas
        const trx = await db.transaction();
    
        try {
            // O ".insertI()" retorna uma array que será guardado dentro da variável insertedUsersIds para fazer o relacionamento
            const insertedUsersIds = await trx('users').insert({
                // Colunas dentro da tabela "users"
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            // Captura o ID sempre que um novo usuário é criado
            const user_id = insertedUsersIds[0];
            
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost, 
                user_id,
            });
            
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                }
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
        
            return response.status(201).send(); 
            
        } catch (error) {
            await trx.rollback(); // Se acontecer algum erro durante a criação, o rollback irá desfazer as alterações 
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}