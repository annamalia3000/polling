import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Message } from './Message';

const messageHandler = new Message('.messages-list');

const url = 'http://localhost:7070/messages/unread';

const observable = interval(5000);

function fetchMessages() {
    return ajax.getJSON(url)
        .pipe(
            catchError(error => {
                console.log('Error fetching messages:', error);
                return of({ messages: [] });
            })
        );
}

function extractMessages(response) {
    return response.messages || [];
}

function handleMessages(messages) {
    if (messages.length > 0) {
        messageHandler.addMessages(messages);
    }
}

observable
    .pipe(
        concatMap(() => fetchMessages()), // выполняет запрос каждые 5 секунд последовательно
        map(extractMessages)              // извлекает сообщения из ответа сервера
    )
    .subscribe(handleMessages);           // добавляет сообщения на страницу
