const Event_Bus = {
    events: {},
    subscribe: function (eventName, fn) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
    },
    unsubscribe: function (eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(func => func !== fn);
        }
    },
    trigger: function (eventName, data) {

        if (this.events[eventName]) {

            this.events[eventName].forEach(function (func) {

                try {
                    func(data);
                } catch (e) {

                }

            });
        }
    }
};

export default Event_Bus;