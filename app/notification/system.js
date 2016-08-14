export var notify = (title, text) => {
    var notification = new Notification(title, {body: text});

    setTimeout(() => {
        notification.close();
    }, 5000)
}
