export function shortSubject(subject) {
    return subject.length > 15 ? `${subject.slice(0, 15)}...` : subject;
}