class CustomEventEmitter{
    constructor(name = null){
        this.name = name;
        this.events = {};
    }

    on(event, listener){
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event,...args){
        const listeners = this.events[event];

        if(!listeners) return;


        listeners.forEach(fn => 
            fn(...args)
        );
    }

    off(event, listener){
        const listeners = this.events[event];

        if(!listeners) return;

        this.events[event] = listeners.filter(fn => fn !== listener);
    }


}


module.exports = CustomEventEmitter;
