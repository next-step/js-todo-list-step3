export const Pipe = class {
    #topics;

    constructor() {
        this.#topics = new Map();
    }

    addTopics(...topics) {
        topics.forEach(this.#addTopic);
    }

    #addTopic = (topic) => {
        if (!this.#topics.get(topic))
            this.#topics.set(topic, new Map());
    };

    deleteTopic = (topic) => {
        this.#topics.delete(topic);
    };

    regist({ topic, key,handler, context }) {
        if (!this.#topics.get(topic)) {
            this.#addTopic(topic);
        }
        const topicSet = this.#topics.get(topic);
        topicSet.set(key,{ handler, context });
    }

    unregist({ topic, key }) {
        const currentTopic = this.#topics.get(topic);
        if (currentTopic) {
            currentTopic.delete(key);
        }
    }

    notify({ topic, to, data }) {
        const targets = this.#topics.get(topic);
        if (targets) {
            if (to) {
                const toTarget = targets.get(to);
                toTarget['handler'].call(toTarget['context'], data);
                return ;
            }
            for (const target of targets) {
                target['handler'].call(target['context'], data);
            }
        }
    }

}
