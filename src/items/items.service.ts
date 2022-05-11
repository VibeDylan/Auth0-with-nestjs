import { Injectable } from '@nestjs/common';
import { Item } from 'src/item';
import { Items } from 'src/items';

@Injectable()
export class ItemsService {
    private readonly items: Items = {
        1: {
            id: 1, 
            name: "Burger",
            price: 5.99,
            description: "Tasty",
            image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
        },
        2: {
            id: 2, 
            name: "Pizza",
            price: 7.99,
            description: "Cheese",
            image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
        },
        3: {
            id: 3,
            name: 'Tea',
            price: 1.99,
            description: 'Informative',
            image: 'https://cdn.auth0.com/blog/whatabyte/tea-sm.png',
        },
    };

    findAll(): Items {
        return this.items;
    }

    create(newItem: Item): void {
        const id = new Date().valueOf();
        this.items[id] = { 
            ...newItem,
            id
        }
    }

    find(id: number): Item {
        const record: Item = this.items[id];

        if(record) {
            return record
        }

        throw new Error("No record found with this identifiant.")
    }

    update(updatedItem: Item): void {
        if(this.items[updatedItem.id]) {
            this.items[updatedItem.id] = updatedItem;
            return;
        }

        throw new Error("No record found for update");
    }

    delete(id: number): void {
        const record: Item = this.items[id]

        if(record) {
            delete this.items[id]
            return;
        }

        throw new Error("No record found with this identifiant");
    }
}
