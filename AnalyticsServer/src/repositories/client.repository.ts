import { createClient } from 'redis';

class ClientRepository {
    client;

    connect: () => Promise<void>;

    constructor() {
        this.client = createClient({ socket: { connectTimeout: 20000 } });

        this.connect = async () => this.client.connect().catch((e) => console.error(e));
        this.connect();
    }

    public async getKey(key: string): Promise<string | null> {
        return this.client.get(key);
    }
}

export const clientRepository = new ClientRepository();
