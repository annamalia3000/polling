import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { addMessages } from './addMessages';

const url = 'http://localhost:7070/messages/unread';

interval(5000) 
    .pipe(
        concatMap(() => 
            ajax.getJSON(url).pipe(
                catchError(error => {
                    console.error('Error fetching messages:', error);
                    // Возвращаем пустой объект, чтобы было аналогично отсутствию новых сообщений
                    return of({ messages: [] });
                })
            )
        ),
        map(response => response.messages || []) // Извлекаем сообщения из ответа
    )
    .subscribe(messages => {
        console.log(messages);
        if (messages.length > 0) {
            addMessages(messages); // Добавляем новые сообщения в таблицу
        }
    });