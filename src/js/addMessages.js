import { shortSubject } from './shortSubject';
import { formatDate } from './formatDate';

export function addMessages(messages) {
    const messageslist = document.querySelector('.messages-list');

    messages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.classList.add('message-item');
        
        const messageFrom = document.createElement('div');
        messageFrom.classList.add('message-from');
        messageFrom.textContent = message.from;

        const messageSubject = document.createElement('div');
        messageSubject.classList.add('message-subject');
        messageSubject.textContent = shortSubject(message.subject);

        const messageDate = document.createElement('div');
        messageDate.classList.add('message-date');
        messageDate.textContent = formatDate(message.received);

        messageItem.appendChild(messageFrom);
        messageItem.appendChild(messageSubject);
        messageItem.appendChild(messageDate);
        messageslist.insertBefore(messageItem, messageslist.firstChild);
    });

}