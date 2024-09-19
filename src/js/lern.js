class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    next(value) {
        this.observers.forEach(observer => observer(value));
    }
}

const emailStream$ = new Subject();

const email = document.querySelector('.email');

email.addEventListener('input', (event) => {
    emailStream$.next(event.target.value);

});

function updateHello(value) {
    const hello = document.querySelector('.hello');
    hello.textContent = 'Hello,' + ( value || 'Anonim');
}

function logTextInputName(name, value) {
    const time = performance.now();

    console.log('Input in ' + name + ' : ' + value + ' ' + time);

}

function fetchEmail(value) {
    fetch('http://localhost:7070/check/email/' + value);
}

emailStream$.subscribe(updateHello);
emailStream$.subscribe(logTextInputName.bind(null, 'email'));
emailStream$.subscribe(fetchEmail);